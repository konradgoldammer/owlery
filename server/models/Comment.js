const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = {
  reviewId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
};

const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;
