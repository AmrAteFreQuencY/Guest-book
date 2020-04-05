const mongoose = require("mongoose");

const Message = mongoose.model("Message", {
  Writer: {
    type: String,
    required: true,
    trim: true
  },
  Message: {
    trim: true,
    required: true,
    type: String
  }
});

module.exports = Message;
