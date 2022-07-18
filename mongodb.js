const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

// const id = new ObjectId();
const connectionURL = "mongodb://localhost:27017";
const database = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to Database");
    }
    const db = client.db(database);

    // db.collection("users").insertOne(
    //   { name: "Vikram", age: 18 },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("error occurred");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Jen",
    //       age: 28,
    //     },
    //     { name: "gunther", age: 30 },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("error occurred");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    //     db.collection("tasks").insertMany(
    //       [
    //         { description: "Cleaning the living room", completed: false },
    //         { description: "Watering the plants", completed: true },
    //         { description: "Preparing dinner", completed: false },
    //       ],
    //       (error, result) => {
    //         if (error) {
    //           return console.log("Unable to insert tasks");
    //         }
    //         console.log(result.ops);
    //       }
    //     );

    // db.collection("users").findOne({ age: 18 }, (error, result) => {
    //   if (error) {
    //     return console.log("Unable to find");
    //   }
    //   console.log(result);
    // });

    // db.collection("users")
    //   .find({ age: 28 })
    //   .toArray((error, results) => {
    //     console.log(results);
    //   });

    // db.collection("tasks").findOne(
    //   {
    //     _id: ObjectId("62d00c000b73120a60e90650"),
    //   },
    //   (error, result) => {
    //     console.log(result);
    //   }
    // );

    // db.collection("tasks")
    //   .find({ completed: false })
    //   .toArray((error, results) => {
    //     console.log(results);
    //   });

    //     db.collection("users")
    //       .updateOne(
    //         { _id: ObjectId("62d00935656b873de8784d0e") },
    //         { $inc: { age: 2 } }
    //       )
    //       .then((res) => console.log(res))
    //       .catch((err) => console.log(err));

    //     db.collection("tasks")
    //       .updateMany({ completed: false }, { $set: { completed: true } })
    //       .then((res) => console.log(res))
    //       .catch((err) => console.log(err));

    db.collection("users")
      .deleteMany({ age: 31 })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));


db.collection("tasks").deleteOne({description:"Cleaning the living room"}).then(res=>console.log(res)).catch(err=>console.log(err))




  }
);
