const express = require("express");
const app = express();
const router = express.Router();
const User = require("../../schemas/UserSchema");
const Post = require("../../schemas/PostSchema");

app.use(express.urlencoded({ extended: false }));

router.get("/", async (req, res, next) => {
  Post.find()
    .populate("postedBy")
    .sort({ createdAt: -1 })
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(400);
    });
});

router.post("/", async (req, res, next) => {
  if (!req.body.content) {
    console.log("Content param not sent with request!");
    res.sendStatus(400);
  }

  const postData = {
    content: req.body.content,
    postedBy: req.session.user,
  };

  Post.create(postData)
    .then(async (newPost) => {
      newPost = await User.populate(newPost, { path: "postedBy" });
      res.status(201).send(newPost);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(400);
    });
});

module.exports = router;
