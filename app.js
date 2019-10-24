// dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

// Config apps
mongoose.connect("mongodb://localhost/Citydb", { useNewUrlParser: true, useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// defining mongoose Schema
const citySchema = new mongoose.Schema({
  name: String,
  population: Number,
  country: String,
  description: String
});

var City = mongoose.model("City", citySchema);

app.get("/", function(req, res) {
  res.redirect("/cities");
});

// INDEX
app.get("/cities", function(req, res) {
  City.find({}, function(err, city) {
    if (err) {
      console.log(err);
    } else res.render("index", { city: city });
  });
});

// NEW
app.get("/cities/new", function(req, res) {
  res.render("new");
});

// CREATE
app.post("/cities", function(req, res) {
  City.create(req.body.city, function(err, newCity) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/cities");
    }
  });
});

// SHOW
app.get("/cities/:id", function(req, res) {
  City.findById(req.params.id, function(err, foundCity) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { city: foundCity });
    }
  });
});

// EDIT
app.get("/cities/:id/edit", function(req, res) {
  City.findById(req.params.id, function(err, foundCity) {
    if (err) {
      res.redirect("/cities");
    } else {
      res.render("edit", { city: foundCity });
    }
  });
});

// UPDATE
app.put("/cities/:id", function(req, res) {
  City.findByIdAndUpdate(req.params.id, req.body.city, function(err, updatedCity) {
    if (err) {
      res.redirect("/cities");
    } else {
      res.redirect("/cities/" + req.params.id);
    }
  });
});

// DELETE
app.delete("/cities/:id", function(req, res) {
  City.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/cities");
    }
  });
});

app.get("*", function(req, res) {
  res.send("Entered an invalid path, please return to the homepage");
});

app.listen(3000);
console.log("server is now live and listening at port 3000");
