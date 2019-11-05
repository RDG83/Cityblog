const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const User = require("../models/user");

router.get("/", function(req, res) {
  res.render("landing");
});

router.get("/signup", function(req, res) {
  res.render("signup");
});

router.post("/signup", function(req, res) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/signup");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/cities");
      });
    }
  });
});

router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), function(req, res) {
  res.redirect("/cities");
});

router.get("/logout", function(req, res) {
  req.logOut();
  res.redirect("/cities");
});

module.exports = router;
