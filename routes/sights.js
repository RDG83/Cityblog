const express = require("express");
const router = express.Router({ mergeParams: true });
const Sight = require("../models/sight");
const City = require("../models/city");
const Comment = require("../models/comment");
const middleware = require("../middleware");

// INDEX ROUTE
router.get("/", function(req, res) {
  Sight.find({}, function(err, sight) {
    if (err) {
      console.log(err);
    } else res.render("sights/index", { sight: sight });
  });
});

// NEW ROUTE
router.get("/new", function(req, res) {
  City.findById(req.params.id, function(err, city) {
    if (err) {
      console.log(err);
    } else {
      res.render("sights/new", { city: city });
    }
  });
});

// CREATE ROUTE
router.post("/", function(req, res) {
  City.findById(req.params.id, function(err, city) {
    if (err) {
      console.log(err);
      res.redirect("/cities");
    } else {
      Sight.create(req.body.sight, function(err, sight) {
        if (err) {
          console.log(err);
        } else {
          sight.author.id = req.user.id;
          sight.author.username = req.user.username;
          sight.save();
          city.sights.push(sight);
          city.save();
          res.redirect("/cities/" + city._id);
        }
      });
    }
  });
});

// SHOW ROUTE
router.get("/:id", middleware.isLoggedIn, function(req, res) {
  Sight.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundSight) {
      if (err) {
        console.log(err);
      } else {
        res.render("sights/show", { sight: foundSight });
      }
    });
});

// EDIT ROUTE

// UPDATE ROUTE

// DELETE ROUTE

module.exports = router;
