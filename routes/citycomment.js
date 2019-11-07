const express = require("express");
const router = express.Router({ mergeParams: true });
const City = require("../models/city");
const Comment = require("../models/comment");

// NEW
router.get("/new", function(req, res) {
  City.findById(req.params.id, function(err, foundCity) {
    if (err) {
      console.log(err);
      res.redirect("/cities");
    } else {
      res.render("citycomments/new", { city: foundCity });
    }
  });
});

// CREATE

router.post("/", function(req, res) {
  console.log(req.params.id);
  console.log(req.body.comment);
  City.findById(req.params.id, function(err, foundCity) {
    if (err) {
      console.log(err);
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          foundCity.comments.push(comment);
          foundCity.save();
          res.redirect("/cities/" + foundCity.id);
        }
      });
    }
  });
});

// EDIT
router.get("/comment_id/edit", function(req, res) {
  Comment.findById(req.params.comment_id, function(err, comment) {
    if (err) {
      console.log(err);
    } else {
      res.render("citycomments/edit", { comment: comment });
    }
  });
});
// UPDATE

// DELETE

module.exports = router;
