const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: String,
  image: String,
  country: String,
  description: String,
  population: Number,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  sights: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sight"
    }
  ]
});

module.exports = mongoose.model("City", citySchema);
