const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Comment = require("../../models/Comment");
const User = require("../../models/User");
const Review = require("../../models/Review");
const auth = require("../../middleware/auth");

// Adds author objects to comment objects in an array of reviews (based on the authorId property)
const addAuthorObjects = (comments) => {
  return new Promise((resolve, reject) => {
    const promiseArr = comments.reduce((total, comment) => {
      total.push(
        new Promise((resolve, reject) => {
          User.findById(comment.authorId)
            .select("-password")
            .then((user) => {
              resolve(user);
            })
            .catch((err) => {
              reject(err);
            });
        })
      );
      return total;
    }, []);
    Promise.all(promiseArr)
      .then((authors) => {
        resolve(
          comments.map((comment, index) => {
            return { comment, author: authors[index] };
          })
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

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

    // Create comment object
    const newComment = new Comment({
      reviewId,
      content,
      authorId: req.user.id,
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
      if (comment.authorId !== userId) {
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
      // Add author objects to comment objects for the response JSON
      addAuthorObjects(comments).then((commentsWithAuthorObject) => {
        return res.json(commentsWithAuthorObject);
      });
    })
    .catch((err) => {
      return console.log(err);
    });
});

module.exports = router;
