const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Comment = require("../../models/Comment");
const User = require("../../models/User");
const Review = require("../../models/Review");
const auth = require("../../middleware/auth");

// @route    POST "/"
// @desc.    Comment on existing review
// @access   Private
router.post("/", auth, (req, res) => {
  const { reviewId, content } = req.body;

  // Simple validation
  if (!content || !reviewId) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Validation of review ID
  if (!mongoose.isValidObjectId(reviewId)) {
    return res
      .status(400)
      .json({ msg: "The ID of the review you want to comment on is invalid" });
  }

  Review.findById(reviewId).then((review) => {
    if (!review) {
      return res.status(400).json({
        msg: "There is no review with this ID",
      });
    }

    // Get author data
    User.findById(req.user.id)
      .select("-password")
      .then((author) => {
        // Create comment object
        const newComment = new Comment({
          reviewId,
          content,
          author,
          date: new Date(),
        });

        // Add comment to database
        newComment
          .save()
          .then((comment) => {
            return res.json(comment);
          })
          .catch((err) => {
            return console.log(err);
          });
      });
  });
});

// @route    DELETE "/:commentId"
// @desc.    Delete comment
// @access   Private
router.delete("/:commentId", auth, (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.user.id;

  // Validation of commentId
  if (!mongoose.isValidObjectId(commentId)) {
    return res
      .status(400)
      .json({ msg: "The ID of the comment you want to delete is invalid" });
  }

  Comment.findById(commentId)
    .then((comment) => {
      if (!comment) {
        return res
          .status(400)
          .json({ msg: "There is no comment with this ID" });
      }

      // Check if user is authorized to delete this comment
      if (comment.author._id.toString() !== userId) {
        return res.status(401).json({
          msg: "You are unautorized to do this; You can only delete your own comment",
        });
      }

      // Delete comment from database
      Comment.deleteOne({ _id: commentId })
        .then(() => {
          return res.json({
            msg: `Successfully deleted comment with the ID ${commentId}`,
          });
        })
        .catch((err) => {
          return console.log(err);
        });
    })
    .catch((err) => {
      return console.log(err);
    });
});

// @route    GET "/:reviewId?skip=xxx"
// @desc.    Get comments of a review (sorted by date)
// @access   Public
router.get("/:reviewId", (req, res) => {
  const reviewId = req.params.reviewId;
  let skip = Number(req.query.skip) || 0;
  if (skip === NaN) {
    skip = 0;
  }

  Comment.find({ reviewId }, {}, { skip, limit: 10, sort: { date: -1 } })
    .then((comments) => {
      return res.json(comments);
    })
    .catch((err) => {
      return console.log(err);
    });
});

module.exports = router;
