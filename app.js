// dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const indexRoutes = require("./routes/index");
const cityRoutes = require("./routes/cities");
const citycommentRoutes = require("./routes/citycomment");
const sightRoutes = require("./routes/sights");
const sightcommentRoutes = require("./routes/sightcomment");

// Config apps
mongoose.connect("mongodb://localhost/Citydb", { useNewUrlParser: true, useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(indexRoutes);
app.use("/cities", cityRoutes);
app.use("/cities/:id/comments", citycommentRoutes);
app.use("/cities/:id/sights", sightRoutes);
app.use("/cities/:id/sights/:id/sightcomments", sightcommentRoutes);

app.get("*", function(req, res) {
  res.send("You entered a wrong path, please return to the homepage");
});

const port = process.env.port || 3000;
app.listen(port);
console.log("server is now live and listening at port: " + port);
