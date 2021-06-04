const express = require("express");
const bcrypt = require("bcryptjs");
const {
  pickSome
} = require("pick-some");
const multer = require("multer");
const readingTime = require("reading-time");
const Post = require("../models/post");
const User = require("../models/user");
const Hashtags = require("../models/hashtags");
const Ready = require("../models/ready");

const {
  findById,
  findByIdAndUpdate
} = require("../models/post");
const router = new express.Router();

router.post("/posts/post_det", async (req, res) => {
  try {
    const response = await Post.findById(req.body.id);
    res.status(200).send(response);
  } catch (e) {
    res.status(400).send({
      error: "something went wrong",
    });
  }
});

router.post("/posts/publish", async (req, res) => {
  const post = new Post(req.body);
  try {
    var a = await post.save();
    res.status(201).send(a);
  } catch (e) {
    res.status(400).send({
      error: "something went wrong",
    });
  }
});

router.post("/posts/hashtags", async (req, res) => {
  try {
    for (let i = 0; i < 3; i++) {
      switch (req.body.hashtags[i]) {
        case "geek":
          await Hashtags.findOneAndUpdate({
            _id: "60b707fc3330262dc0eba402"
          }, {
            $addToSet: {
              geek: req.body.post_id,
            },
          });

          break;
        case "technology":
          await Hashtags.findOneAndUpdate({
            _id: "60b707fc3330262dc0eba402"
          }, {
            $addToSet: {
              technology: req.body.post_id,
            },
          });
          break;
        case "software":
          await Hashtags.findOneAndUpdate({
            _id: "60b707fc3330262dc0eba402"
          }, {
            $addToSet: {
              software: req.body.post_id,
            },
          });
          break;
        case "internet":
          await Hashtags.findOneAndUpdate({
            _id: "60b707fc3330262dc0eba402"
          }, {
            $addToSet: {
              internet: req.body.post_id,
            },
          });
          break;
        case "crypto":
          await Hashtags.findOneAndUpdate({
            _id: "60b707fc3330262dc0eba402"
          }, {
            $addToSet: {
              crypto: req.body.post_id,
            },
          });
          break;
        case "design":
          await Hashtags.findOneAndUpdate({
            _id: "60b707fc3330262dc0eba402"
          }, {
            $addToSet: {
              design: req.body.post_id,
            },
          });
          break;
        case "coding":
          await Hashtags.findOneAndUpdate({
            _id: "60b707fc3330262dc0eba402"
          }, {
            $addToSet: {
              coding: req.body.post_id,
            },
          });
          break;
        case "computer":
          await Hashtags.findOneAndUpdate({
            _id: "60b707fc3330262dc0eba402"
          }, {
            $addToSet: {
              computer: req.body.post_id,
            },
          });
          break;
        default:
          break;
      }
    }

    res.status(201).send({
      working: "this is working",
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({
      error: "something went wrong",
    });
  }
});

const upload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("Please provide a png or jpg file"));
    }

    // cb(new Error("please upload an image"))
    cb(undefined, true);
  },
});

router.post(
  "/upload/post",
  upload.single("pic"),
  async (req, res) => {
      try {
        const post = await Post.findByIdAndUpdate(req.body.id, {
          pic: req.file.buffer,
        });
        res.status(201).send(post);
      } catch (e) {
        res.status(400).send({
          error: "something went wrong",
        });
      }
    },
    (err, req, res, next) => {
      res.status(400).send({
        error: err.message,
      });
    }
);

router.post("/post/comment", async (req, res) => {
  try {
    const comment = await Post.findOneAndUpdate({
      _id: req.body.id,
    }, {
      comments: {
        commenter_id: req.body.comments.commenter_id,
        comment: req.body.comments.comment,
      },
    }, {
      upsert: true,
      useFindAndModify: false,
    });
    res.status(201).send(comment);
  } catch (e) {
    res.status(400).send({
      error: "something went wrong",
    });
  }
});

router.post("/post/commentsUpdate", async (req, res) => {
  try {
    var a = await Post.findOne({
      _id: req.body.id,
    });
    var b = {
      commenter_id: req.body.commenter_id,
      comment: req.body.comment,
    };
    console.log(b);
    a.comments.push(b);
    console.log(a);
    const c = await Post.findByIdAndUpdate(req.body.id, {
      comments: a.comments,
    });
    res.status(201).send(c);
  } catch (e) {
    console.log(e);
    res.status(400).send({
      error: "something went wrong",
    });
  }
});

router.post("/post/liked_check", async (req, res) => {
  try {
    const user = await User.findById(req.body.user_id);
    const liked_count = user.liked_post;
    if (!liked_count.includes(req.body.id)) {
      res.status(200).send({
        liked: 0,
      });
    }
    res.status(200).send({
      liked: 1,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({
      error: "something went wrong",
    });
  }
});

router.post("/post/bookmarked_check", async (req, res) => {
  try {
    const user = await User.findById(req.body.user_id);
    const bookmarked_count = user.bookmarked;
    if (!bookmarked_count.includes(req.body.id)) {
      res.status(200).send({
        bookmarked: 0,
      });
    }
    res.status(200).send({
      bookmarked: 1,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({
      error: "something went wrong",
    });
  }
});

router.post("/post/commented_check", async (req, res) => {
  try {
    const user = await User.findById(req.body.user_id);
    const commented_count = user.commented_post;
    if (!commented_count.includes(req.body.id)) {
      res.status(200).send({
        commented: 0,
      });
    }
    res.status(200).send({
      commented: 1,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({
      error: "something went wrong",
    });
  }
});

router.post("/post/bookmarked", async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.id, {
        $inc: {
          bookmarks: 1,
        },
      }, {
        upsert: true,
        new: true,
      }
    );

    const result1 = await User.findOneAndUpdate({
      _id: req.body.user_id,
    }, {
      $addToSet: {
        bookmarked: req.body.id,
      },
    });

    res.status(201).send({
      bookmarked: "done",
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({
      error: "something went wrong",
    });
  }
});

router.post("/post/commented", async (req, res) => {
  try {
    const result = await User.findOneAndUpdate({
      _id: req.body.user_id,
    }, {
      $addToSet: {
        commented_post: req.body.id,
      },
    });

    res.status(201).send({
      bookmarked: "done",
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({
      error: "something went wrong",
    });
  }
});

router.post("/post/capture_comments", async (req, res) => {
  try {
    const result = await Post.findById(req.body.id);
    res.status(200).send(result.comments);
  } catch (e) {
    console.log(e);
    res.status(400).send({
      error: "something went wrong",
    });
  }
});

router.post("/post/liked", async (req, res) => {
  try {
    const user = await User.findById(req.body.user_id);
    const liked_count = user.liked_post;
    if (!liked_count.includes(req.body.id)) {
      const result = await Post.findByIdAndUpdate(
        req.body.id, {
          $inc: {
            likes: 1,
          },
        }, {
          upsert: true,
          new: true,
        }
      );

      const result1 = await User.findOneAndUpdate({
        _id: req.body.user_id,
      }, {
        $addToSet: {
          liked_post: req.body.id,
        },
      });

      res.status(201).send({
        liked: "done",
      });
    }
    res.status(200).send({
      liked: "already done",
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({
      error: "something went wrong",
    });
  }
});

router.post("/post/shares", async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.id, {
        $inc: {
          shares: 1,
        },
      }, {
        upsert: true,
        new: true,
      }
    );
    res.status(200).send({
      shares: "done",
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({
      error: "something went wrong",
    });
  }
});

router.post("/post/report", async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.id, {
        $inc: {
          reports: 1,
        },
      }, {
        upsert: true,
        new: true,
      }
    );
    res.status(200).send({
      report: "done",
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({
      error: "something went wrong",
    });
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || !post.pic) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(post.pic);
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/post/read_min", async (req, res) => {
  try {
    var read_min = await readingTime(req.body.read_min);
    var temp = Math.ceil(read_min.minutes);
    const result = await Post.findByIdAndUpdate(req.body.id, {
      read_min: temp,
    });
    res.status(201).send(result);
  } catch (e) {
    console.log(e);
    res.status(400).send({
      error: "something went wrong",
    });
  }
});

router.post("/post/publisher_det", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.user_id, {
      $addToSet: {
        published_post: req.body.id,
      },
    });
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send({
      error: "Invalid recommendation",
    });
  }
});

router.post("/post/message", async (req, res) => {
  try {
    var temp = {
      activity: req.body.activity,
      user_id: req.body.user_id,
      post_id: req.body.post_id,
      user_name: req.body.user_name,
    };
    const user = await User.findByIdAndUpdate(req.body.id, {
      $addToSet: {
        messages: temp,
      },
    });
    res.status(201).send({
      done: "working"
    });
  } catch (e) {
    res.status(400).send({
      error: "something went wrong",
    });
  }
});

router.post("/post/message/delete", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.id, {
      $set: {
        messages: []
      },
    });
    res.status(201).send({
      done: "working"
    });
  } catch (e) {
    res.status(400).send({
      error: "something went wrong",
    });
  }
});

module.exports = router;