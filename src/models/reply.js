const mongoose = require("mongoose");

const Reply = mongoose.model("Reply", {
  Replyto: {
    trim: true,
    type: String,
    required: true
  }
});

module.exports = Reply;
