const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", function(req, res) {
  res.render("landing");
});

router.get("/signup", function(req, res) {
  res.render("signup");
});

router.get("/login", function(req, res) {
  res.render("login");
});

router.get("/logout", function(req, res) {
  req.logOut();
  res.redirect("/cities");
});

module.exports = router;
