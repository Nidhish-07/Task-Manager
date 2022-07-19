const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/task");

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({ ...req.body, creator: req.user._id });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(err);
  }
});

//* getting filtered tasks, adding pagination
router.get("/tasks", auth, async (req, res) => {
  try {
    if (!req.query.completed) {
      const tasks = await Task.find({ creator: req.user._id })
        .limit(+req.query.limit)
        .skip(+req.query.skip);
      return res.status(200).send(tasks);
    } else {
      const tasks = await Task.find({
        creator: req.user._id,
        completed: req.query.completed == "true",
      })
        .limit(+req.query.limit)
        .skip(+req.query.skip);

      res.status(200).send(tasks);
    }

    // await req.user.populate("tasks").execPopulate();
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    // const task = await Task.findById(_id);

    const task = await Task.findOne({ _id, creator: req.user._id });
    if (!task) {
      return res.sendStatus(404);
    }
    res.status(200).send(task);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send(`errors: Invalid Update`);
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      creator: req.user._id,
    });

    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    if (!task) {
      return res.sendStatus(404);
    }

    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete({
      _id: req.params.id,
      creator: req.user._id,
    });
    if (!task) {
      return res.sendStatus(404);
    }
    res.send(task).status(200);
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
