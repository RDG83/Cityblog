const mongoose = require("mongoose");

const sightSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Type.Objectid,
      ref: "User"
    }
  },
  username: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sightcomment"
    }
  ]
});

module.exports = mongoose.model("Sight", sightSchema);
