const mongoose = require("mongoose");

const avatarSchema = new mongoose.Schema({
  avatar_pic: {
    type: Buffer,
  },
});

const Avatar = mongoose.model("Avatar", avatarSchema);

module.exports = Avatar;
