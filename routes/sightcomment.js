const express = require("express");
const router = express.Router({ mergeParams: true });
const Sight = require("../models/sight");

// NEW
router.get("/new", function(req, res) {
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
// router.post("/", function(req, res) {
//   City.findById(req.params.id, function(err, foundCity) {
//     if (err) {
//       console.log(err);
//     } else {
//       Comment.create(req.body.comment, function(err, comment) {
//         if (err) {
//           console.log(err);
//         } else {
//           comment.author.id = req.user.id;
//           comment.author.username = req.user.username;
//           comment.save();
//           foundCity.comments.push(comment);
//           foundCity.save();
//           res.redirect("/cities/" + foundCity.id);
//         }
//       });
//     }
//   });
// });

// // EDIT
// router.get("/:comment_id/edit", function(req, res) {
//   Comment.findById(req.params.comment_id, function(err, comment) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render("citycomments/edit", { city_id: req.params.id, comment: comment });
//     }
//   });
// });

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
