const express = require("express");
const router = express.Router({ mergeParams: true });
const City = require("../models/city");

// NEW
router.get("/new", function(req, res) {
  res.render("citycomments/new");
});

// CREATE

// EDIT

// UPDATE

// DELETE

module.exports = router;
