const express = require("express");
const router = express.Router({ mergeParams: true });
const Sight = require("../models/sight");
const Comment = require("../models/comment");
const middleware = require("../middleware");

// NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
  Sight.findById(req.params.sight_id, function(err, foundSight) {
    if (err) {
      console.log(err);
      res.redirect("/cities");
    } else {
      res.render("sightcomments/new", { city_id: req.params.id, sight: foundSight });
    }
  });
});

// CREATE
router.post("/", function(req, res) {
  Sight.findById(req.params.sight_id, function(err, foundSight) {
    if (err) {
      console.log(err);
    } else {
      console.log(req.body.comment);
      console.log(req.user);
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          comment.author.id = req.user.id;
          comment.author.username = req.user.username;
          comment.save();
          foundSight.comments.push(comment);
          foundSight.save();
          res.redirect("/cities/" + req.params.id + "/sights/" + foundSight.id);
        }
      });
    }
  });
});

// // EDIT
router.get("/:comment_id/edit", function(req, res) {
  Comment.findById(req.params.comment_id, function(err, comment) {
    if (err) {
      console.log(err);
    } else {
      res.render("sightcomments/edit", { sight_id: req.params.sight_id, comment: comment });
    }
  });
});

// // UPDATE
// router.put("/:comment_id", function(req, res) {
//   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.redirect("/cities/" + req.params.id);
//     }
//   });
// });

// // DELETE
// router.delete("/:comment_id", function(req, res) {
//   Comment.findByIdAndDelete(req.params.comment_id, function(err, comment) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.redirect("/cities/" + req.params.id);
//     }
//   });
// });

module.exports = router;
