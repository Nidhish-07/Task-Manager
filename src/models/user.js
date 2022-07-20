const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("../models/task");

/**
 * pattern:
 * 
 Schema
 middleware
 Model 
 */

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a positive number");
        }
      },
      default: 0,
    },
    email: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      validate(value) {
        if (value.trim().includes("password")) {
          throw new Error("This password not valid");
        }
      },
      required: true,
      minlength: [8, "Password should be more than of 8 characters"],
    },
    tokens: [{ token: { type: String, required: true } }],
    avatar: { type: Buffer },
  },
  { timestamps: true }
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "creator",
});

//* generating auth token
userSchema.methods.createAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

//*getting only values
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

//* verifying user
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

//*hashing the password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

//*deleting user and its tasks
userSchema.pre("remove", async function (next) {
  const user = this;

  await Task.deleteMany({ creator: user._id });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
