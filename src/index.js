const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.port ;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// const main = async () => {
  // const task = await Task.findById("62d6050f7325780fb8df2979");
  // await task.populate("creator").execPopulate();
  // console.log(task.creator);

//   const user = await User.findById("62d5932ac9ee383a481b1c09");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };

// main();
app.listen(port, () => {
  console.log(`Server is at port: ${port}`);
});
