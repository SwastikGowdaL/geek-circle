const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  hashtags: [
    {
      type: String,
    },
  ],
  body: Object,
  pic: {
    type: Buffer,
  },
  comments: [
    {
      commenter_id: {
        type: String,
        new:true
      },
      comment: {
        type: String,
        new:true
      },
    },
  ],
  likes: {
    type: Number,
    default:0
  },
  bookmarks: {
    type: Number,
    default:0
  },
  views: {
    type: Number,
    default:1
  },
  reports: {
    type: Number,
    default: 0,
  },
  publisher: {
    type: String,
  },
  shares:{
    type:Number,
    default:0
  },
  published_date: {
    type: Date,
    default: Date.now,
  },
  read_min: {
    type: Number,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
