const express = require("express");
const router = express.Router({ mergeParams: true });
const City = require("../models/city");
const middleware = require("../middleware");

// INDEX
router.get("/", function(req, res) {
  City.find({}, function(err, city) {
    if (err) {
      console.log(err);
    } else res.render("cities/index", { city: city });
  });
});

// NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
  City.findById(req.params.id, function(err, foundCity) {
    if (err) {
      console.log(err);
    } else {
      res.render("cities/new", { city: foundCity });
    }
  });
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req, res) {
  let author = {
    author: {
      id: req.user._id,
      username: req.user.username
    }
  };
  Object.assign(req.body.city, author);
  City.create(req.body.city, function(err, newCity) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/cities");
    }
  });
});

// SHOW
router.get("/:id", middleware.isLoggedIn, function(req, res) {
  City.findById(req.params.id)
    .populate("sights")
    .populate("comments")
    .exec(function(err, foundCity) {
      if (err) {
        console.log(err);
      } else {
        res.render("cities/show", { city: foundCity });
      }
    });
});

// EDIT
router.get("/:id/edit", middleware.isLoggedIn, function(req, res) {
  City.findById(req.params.id, function(err, foundCity) {
    if (err) {
      res.redirect("/cities");
    } else {
      res.render("cities/edit", { city: foundCity });
    }
  });
});

// UPDATE
router.put("/:id", middleware.isLoggedIn, function(req, res) {
  City.findByIdAndUpdate(req.params.id, req.body.city, function(err, updatedCity) {
    if (err) {
      res.redirect("/cities");
    } else {
      res.redirect("/cities/" + req.params.id);
    }
  });
});

// DELETE
router.delete("/:id", middleware.isLoggedIn, function(req, res) {
  City.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/cities");
    }
  });
});

module.exports = router;
