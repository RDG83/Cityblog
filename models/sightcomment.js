const mongoose = require("mongoose");

const sightcommentSchema = new mongoose.Schema(
  {
    text: String,
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    },
    username: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sightcomment", sightcommentSchema);
