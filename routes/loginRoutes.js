const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../schemas/UserSchema");

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  res.status(200).render("login");
});

router.post("/", async (req, res, next) => {
  const payload = req.body;

  if (req.body.logUsername && req.body.logPassword) {
    let user = await User.findOne({
      $or: [
        { username: req.body.logUsername },
        { email: req.body.logUsername },
      ],
    }).catch((err) => {
      console.error(err);
      payload.errorMessage = "Something went wrong.";
      res.status(200).render("login", payload);
    });
    if (user != null) {
      const result = await bcrypt.compare(req.body.logPassword, user.password);

      if (result === true) {
        req.session.user = user;
        return res.redirect("/");
      }
      payload.errorMessage = "Login credentials incorrect.";
      return res.status(200).render("login", payload);
    }
  }
  payload.errorMessage = "Make sure each field has a valid value.";
  res.status(200).render("login", payload);
});

module.exports = router;
