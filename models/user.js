const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
// const { ObjectID } = require("bson");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
  },
  hashtags: [{
    type: String,
    trim: true,
    new: true,
  }, ],
  avatar: {
    type: Buffer,
  },
  name: {
    type: String,
  },
  published_post: [{
    type: String,
  }, ],
  liked_post: [{
    type: String,
  }, ],
  commented_post: [{
    type: String,
  }, ],
  bookmarked: [{
    type: String,
  }, ],
  cover_pic: {
    type: Buffer,
  },
  tagline: {
    type: String,
  },
  reports: {
    type: Number,
    default: 0,
  },
  messages: [{
    activity: {
      type: String,
      new: true
    },
    user_id: {
      type: String,
      new: true
    },
    user_name: {
      type: String,
      new: true
    },
    post_id: {
      type: String,
      new: true
    }
  }, ]
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;