const express = require("express");
const Reply = require("../models/reply");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/reply", auth, async (req, res) => {
  const message = new Reply({
    ...req.body,
    owner: req.user._id
  });
  try {
    await reply.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/reply", auth, async (req, res) => {
  const reply = await Message.find({ owner: req.user._id });
  try {
    res.send(reply);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/reply/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const reply = await Reply.findOne({ _id, owner: req.user._id });

    if (!reply) {
      res.status(404).send();
    }
    res.send(reply);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/reply/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["Message"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const reply = await Message.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!reply) {
      return res.status(404).send();
    }
    updates.forEach(update => {
      reply[update] = req.body[update];
    });
    await message.save();

    res.send(reply);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete("/reply/:id", auth, async (req, res) => {
  try {
    const reply = await Reply.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!reply) {
      res.status(404).send();
    }
    res.send(reply);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
