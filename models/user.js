const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, "is invalid"], index: true },
    password: String,
    email: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, "is invalid"], index: true },
    bio: String,
    image: String,
    isAdmin: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
