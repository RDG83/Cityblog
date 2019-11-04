const express = require("express");
const router = express.Router();
const City = require("../models/city");

// INDEX
router.get("/", function(req, res) {
  City.find({}, function(err, city) {
    if (err) {
      console.log(err);
    } else res.render("index", { city: city });
  });
});

// NEW
router.get("/new", function(req, res) {
  res.render("new");
});

// CREATE
router.post("/", function(req, res) {
  City.create(req.body.city, function(err, newCity) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/cities");
    }
  });
});

// SHOW
router.get("/:id", function(req, res) {
  City.findById(req.params.id, function(err, foundCity) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { city: foundCity });
    }
  });
});

// EDIT
router.get("/:id/edit", function(req, res) {
  City.findById(req.params.id, function(err, foundCity) {
    if (err) {
      res.redirect("/cities");
    } else {
      res.render("edit", { city: foundCity });
    }
  });
});

// UPDATE
router.put("/:id", function(req, res) {
  console.log(req.body.city);

  City.findByIdAndUpdate(req.params.id, req.body.city, function(err, updatedCity) {
    if (err) {
      res.redirect("/cities");
    } else {
      res.redirect("/cities/" + req.params.id);
    }
  });
});

// DELETE
router.delete("/:id", function(req, res) {
  City.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/cities");
    }
  });
});

module.exports = router;
