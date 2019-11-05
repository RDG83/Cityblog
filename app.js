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

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(require("express-session")({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

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
