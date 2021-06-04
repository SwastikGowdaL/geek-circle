const express = require("express");
const bcrypt = require("bcryptjs");
const { pickSome } = require("pick-some");
const multer = require("multer");
const User = require("../models/user");
const Avatar = require("../models/avatar");
const Cover_pic = require("../models/cover_pic");
const Hashtags = require("../models/hashtags");
const Ready = require("../models/ready");
const { findOneAndUpdate } = require("../models/user");

const router = new express.Router();

const getRandomIntInclusive = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

router.post("/users/signup", async (req, res) => {
  var temp = req.body;
  var a = req.body.email;
  var b = a.split("@");
  temp.name = b[0];

  var avatars = [
    "60b36f5a8ad9e932c8a9fdf6",
    "60b36fec8ad9e932c8a9fdf7",
    "60b370128ad9e932c8a9fdf8",
    "60b370258ad9e932c8a9fdf9",
    "60b370388ad9e932c8a9fdfa",
    "60b3705b8ad9e932c8a9fdfb",
    "60b3709f8ad9e932c8a9fdfc",
    "60b370ab8ad9e932c8a9fdfd",
    "60b371048ad9e932c8a9fdfe",
    "60b3710c8ad9e932c8a9fdff",
    "60b371478ad9e932c8a9fe00",
  ];

  var covers = [
    "60b371f89b0194248cf15b11",
    "60b372749b0194248cf15b12",
    "60b372849b0194248cf15b13",
    "60b372919b0194248cf15b14",
    "60b372a19b0194248cf15b15",
    "60b372bb9b0194248cf15b16",
    "60b372c79b0194248cf15b17",
    "60b372d89b0194248cf15b18",
    "60b372fc9b0194248cf15b19",
    "60b373059b0194248cf15b1a",
  ];

  var apos = getRandomIntInclusive(1, 11);
  var cpos = getRandomIntInclusive(1, 10);

  console.log(apos);
  console.log(cpos);

  const picture = await Avatar.findById(avatars[apos]);
  temp.avatar = picture.avatar_pic;

  const picture2 = await Cover_pic.findById(covers[cpos]);
  temp.cover_pic = picture2.cover_pic;

  temp.tagline = "Prestigious member of Geek Circle";

  const user = new User(temp);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send({
      error: "email or password Invalid",
    });
  }
});

router.post("/users/recommendation", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.id, {
      hashtags: req.body.hashtags,
    });

    const hashtags = await Hashtags.findById("60b707fc3330262dc0eba402");
    var hashtag_slt = [];
    for (let i = 0; i < 3; i++) {
      switch (req.body.hashtags[i]) {
        case "technology":
          hashtag_slt.push(...hashtags.technology);
          break;
        case "geek":
          hashtag_slt.push(...hashtags.geek);
          break;
        case "coding":
          hashtag_slt.push(...hashtags.coding);
          break;
        case "design":
          hashtag_slt.push(...hashtags.design);
          break;
        case "crypto":
          hashtag_slt.push(...hashtags.crypto);
          break;
        case "software":
          hashtag_slt.push(...hashtags.software);
          break;
        case "internet":
          hashtag_slt.push(...hashtags.internet);
          break;
        case "computer":
          hashtag_slt.push(...hashtags.computer);
          break;
      }
    }

    var hashtag_slt2 = [...new Set(hashtag_slt)];
    var ready_posts = [];
    const user_details = await User.findById(req.body.id);

    for (let i = 0; i < hashtag_slt2.length; i++) {
      if (user_details.liked_post.includes(hashtag_slt2[i]) || user_details.commented_post.includes(hashtag_slt2[i]) || user_details.bookmarked.includes(hashtag_slt2[i])) {
      } else {
        ready_posts.push(hashtag_slt2[i]);
      }
    }

    if (ready_posts.length < 5) {
      ready_posts = pickSome(5, { unique: true }, hashtag_slt2);
    }else{
      ready_posts = pickSome(5, { unique: true }, ready_posts);
    }

    var posts_ready = {
      user_id: req.body.id,
      post_id: ready_posts,
    };

    var ready = new Ready(posts_ready);
    await ready.save();

    res.status(201).send({
      working: "working",
    });
  } catch (e) {
    res.status(400).send({
      error: "Invalid recommendation",
    });
  }
});

router.post("/posts/ready", async (req, res) => {
  try {
    const hashtags = await Ready.findOne({
      user_id: req.body.user_id,
    });
console.log(hashtags); 

const hashtag_db=await Hashtags.findById("60b707fc3330262dc0eba402");

    var hashtag_slt = [];
    for (let i = 0; i < 3; i++) {
      switch (req.body.hashtags[i]) {
        case "technology":
          hashtag_slt.push(...hashtag_db.technology);
          break;
        case "geek":
          hashtag_slt.push(...hashtag_db.geek);
          break;
        case "coding":
          hashtag_slt.push(...hashtag_db.coding);
          break;
        case "design":
          hashtag_slt.push(...hashtag_db.design);
          break;
        case "crypto":
          hashtag_slt.push(...hashtag_db.crypto);
          break;
        case "software":
          hashtag_slt.push(...hashtag_db.software);
          break;
        case "internet":
          hashtag_slt.push(...hashtag_db.internet);
          break;
        case "computer":
          hashtag_slt.push(...hashtag_db.computer);
          break;
      }
    }

    var hashtag_slt2 = [...new Set(hashtag_slt)];
    var ready_posts = [];
    const user_details = await User.findById(req.body.user_id);

    for (let i = 0; i < hashtag_slt2.length; i++) {
      if (user_details.liked_post.includes(hashtag_slt2[i]) || user_details.commented_post.includes(hashtag_slt2[i]) || user_details.bookmarked.includes(hashtag_slt2[i])) {
      
      } else {
        ready_posts.push(hashtag_slt2[i]);
      }
    }

    console.log("this is all that have not been liked"); 
    console.log(ready_posts); 

    if (ready_posts.length < 5) {
      ready_posts = pickSome(5, { unique: true }, hashtag_slt2);
      console.log("length less than 5"); 
    }else{
      ready_posts = pickSome(5, { unique: true }, ready_posts);
      console.log("length more than 5"); 
    }

    

    await Ready.findOneAndUpdate(
      {
        user_id: req.body.user_id,
      },
      {
        post_id: ready_posts,
      }
    );

    res.status(200).send(hashtags);
  } catch (e) {
    console.log(e); 
    res.status(400).send({
      error: "Invalid hashtags",
    });
  }
});

router.post("/user/name/edit", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.id, {
      name: req.body.name,
    });
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send({
      error: "Invalid name",
    });
  }
});

router.post("/user/tagline/edit", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.id, {
      tagline: req.body.tagline,
    });
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send({
      error: "Invalid tagline",
    });
  }
});

router.post("/user/password/edit", async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 8);
  try {
    const user = await User.findByIdAndUpdate(req.body.id, {
      password: req.body.password,
    });
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send({
      error: "Invalid password",
    });
  }
});

router.post("/user/email/edit", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.id, {
      email: req.body.email,
    });
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send({
      error: "Invalid email",
    });
  }
});


router.post("/user/reported", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.id, {
      reports: 1,
    });
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send({
      error: "Invalid email",
    });
  }
});


router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      throw new Error("user not found");
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});

router.post("/users/login1", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      throw new Error("user not found");
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});

router.post("/user/name", async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.body.id,
    });

    if (!user) {
      throw new Error("user not found");
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.status(202).send(user);
  } catch (e) {
    res.status(500).send();
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
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
  "/upload",
  upload.single("avatar"),
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.body.id, {
        avatar: req.file.buffer,
      });
      res.status(201).send(user);
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

router.post(
  "/upload/user/cover_pic",
  upload.single("cover_pic"),
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.body.id, {
        cover_pic: req.file.buffer,
      });
      res.status(201).send(user);
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

router.post(
  "/upload/avatar_pic",
  upload.single("avatar_pic"),
  async (req, res) => {
    const picture = new Avatar(req.file.buffer);
    try {
      const pic0 = await picture.save();
      const pic = await Avatar.findByIdAndUpdate(pic0.id, {
        avatar_pic: req.file.buffer,
      });
      res.status(201).send(picture);
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

router.post(
  "/upload/cover_pic",
  upload.single("cover_pic"),
  async (req, res) => {
    const picture = new Cover_pic(req.file.buffer);
    try {
      const pic0 = await picture.save();
      const pic = await Cover_pic.findByIdAndUpdate(pic0.id, {
        cover_pic: req.file.buffer,
      });
      res.status(201).send(pic);
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

router.get("/avatar/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(400).send();
  }
});

router.get("/cover_pic/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.cover_pic) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.cover_pic);
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
