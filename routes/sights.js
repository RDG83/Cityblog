const express = require("express");
const router = express.Router({ mergeParams: true });
const Sight = require("../models/sight");
const City = require("../models/city");

// INDEX ROUTE
router.get("/", function(req, res) {
  res.render("sights/index");
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
          city.sight.push(sight);
          city.save();
          res.redirect("/cities");
        }
      });
    }
  });
});

// SHOW ROUTE

// EDIT ROUTE

// UPDATE ROUTE

// DELETE ROUTE

module.exports = router;
