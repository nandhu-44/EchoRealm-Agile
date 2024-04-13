const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  following: {
    type: Array,
    default: [],
  },
  followers: {
    type: Array,
    default: [],
  },
  posts: {
    type: Array,
    default: [],
  },
  polls: {
    type: Array,
    default: [],
  },
  profilePicture: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    unique: true,
  },
  bio: {
    type: String,
    default: "Echoing thoughts...",
  },
  authProvider: {
    type: String,
    default: "local",
  },
});

module.exports = model("User", userSchema);
