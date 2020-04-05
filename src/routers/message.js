const express = require("express");
const Message = require("../models/message");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/messages", auth, async (req, res) => {
  const message = new Message({
    ...req.body,
    owner: req.user._id
  });
  try {
    await message.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/messages", auth, async (req, res) => {
  const messages = await Message.find({ owner: req.user._id });
  try {
    res.send(messages);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/messages/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const message = await Message.findOne({ _id, owner: req.user._id });

    if (!message) {
      res.status(404).send();
    }
    res.send(message);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/messages/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["Message"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const message = await Message.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!message) {
      return res.status(404).send();
    }
    updates.forEach(update => {
      message[update] = req.body[update];
    });
    await message.save();

    res.send(message);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete("/messages/:id", auth, async (req, res) => {
  try {
    const message = await Message.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!message) {
      res.status(404).send();
    }
    res.send(message);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
