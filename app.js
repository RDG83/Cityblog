// dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const indexRoutes = require("./routes/index");
const cityRoutes = require("./routes/cities");
const citycommentRoutes = require("./routes/citycomment");
const sightcommentRoutes = require("./routes/sightcomment");
const sightRoutes = require("./routes/sights");

// Config apps
mongoose.connect("mongodb://localhost/Citydb", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use(require("express-session")({ secret: "keyboard cat", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(indexRoutes);
app.use("/cities", cityRoutes);
app.use("/cities/:id/comments", citycommentRoutes);
app.use("/cities/:id/sights", sightRoutes);
app.use("/cities/:id/sights/:sight_id/comments", sightcommentRoutes);

app.get("*", function(req, res) {
  res.send("You entered a wrong path, please return to the homepage");
});

const port = process.env.port || 3000;
app.listen(port);
console.log("server is now live and listening at port: " + port);
