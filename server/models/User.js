const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  following: {
    type: Array,
    default: [],
  },
  followers: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    default: () => new Date(),
  },
  episodes: {
    type: Array,
    default: [],
  },
  favoritePodcasts: {
    type: Array,
    default: [],
  },
  likedPodcasts: {
    type: Array,
    default: [],
  },
  location: {
    type: String,
    default: null,
  },
  website: {
    type: String,
    default: null,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
