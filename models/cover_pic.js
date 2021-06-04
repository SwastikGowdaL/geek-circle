const mongoose = require("mongoose");

const cover_picSchema = new mongoose.Schema({
  cover_pic: {
    type: Buffer,
  },
});

const Cover_pic = mongoose.model("Cover_pic", cover_picSchema);

module.exports = Cover_pic;