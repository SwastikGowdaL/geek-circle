const express = require("express");
const bcrypt = require("bcryptjs");
// const multer = require("multer");
const Post = require("../models/post");
const router = new express.Router();

// const upload = multer({
//     limits: {
//       fileSize: 1000000,
//     },
//     fileFilter(req, file, cb) {
//       if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
//         return cb(new Error("Please provide a png or jpg file"));
//       }

//       // cb(new Error("please upload an image"))
//       cb(undefined, true);
//     },
//   });

router.post("/posts/publishing",async (req, res) => {
  var post = new Post(req.body);
//   post1.pic = req.file.buffer;
  try {
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(400).send({
      error: e.message
    });
  }
});
