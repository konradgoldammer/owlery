const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  episode: {
    type: Object,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  log: {
    type: Boolean,
    required: true,
  },
  totalLikes: {
    type: Number,
    default: 0,
  },
  likers: {
    type: Array,
    default: [],
  },
  relisten: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date(),
  },
});

const Review = mongoose.model("review", reviewSchema);
module.exports = Review;
