const mongoose = require("mongoose");

const readySchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  post_id: [{
    type: String,
  }]
});

const Ready = mongoose.model("Ready", readySchema);

module.exports = Ready;