const router = require("express").Router();
//const micsController = require("../../controllers/micsController");
const User = require("../models/user");
const passport = require("../config");

router.post("/", (req, res) => {
  console.log("user signup");

  const { username, password } = req.body;
  // ADD VALIDATION
  User.findOne({ username: username }, (err, user) => {
    console.log("user: ", user);
    if (err) {
      console.log("User.js post error: ", err);
    } else if (user) {
      console.log(`Sorry, already a user with the username: ${username}`);
      res.json({
        error: `Sorry, already a user with the username: ${username}`
      });
    } else {
      const newUser = new User({
        username: username,
        password: password
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});

router.get("/", (req, res, next) => {
  console.log("===== user!!======");
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

router.post(
  "/login",
  function(req, res, next) {
    console.log("routes/user.js, login, req.body: ");

    console.log(req.body);
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("logged in", req.user);
    console.log("req.account:", req.account);
    var userInfo = {
      username: req.user.username,
      id: req.user.id
    };
    res.send(userInfo);
    //res.redirect("/");
  }
);

router.post("/logout", (req, res) => {
  if (req.user) {
    console.log("req.user yes, tryna log out");
    req.logout();
    res.send({ msg: "logging out" });
  } else {
    res.send({ msg: "no user to log out" });
  }
});

module.exports = router;
