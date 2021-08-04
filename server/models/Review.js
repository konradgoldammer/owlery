const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  episode: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Object,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: {
    type: Array,
    default: [],
  },
  totalLikes: {
    type: Number,
    default: 0,
  },
  likers: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Review = mongoose.model("review", reviewSchema);
module.exports = Review;
