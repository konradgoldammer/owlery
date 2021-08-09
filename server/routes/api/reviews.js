const express = require("express");
const router = express.Router();
const config = require("config");
const mongoose = require("mongoose");
const Review = require("../../models/Review");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const { Client } = require("podcast-api");

// Init podcast API client; See documentation: https://www.listennotes.com/api/docs/
const client = Client({ apiKey: config.get("listenApiKey") });

// Adds author objects to review objects in an array of reviews (based on the authorId property)
const addAuthorObjects = (reviews) => {
  return new Promise((resolve, reject) => {
    const promiseArr = reviews.reduce((total, review) => {
      total.push(
        new Promise((resolve, reject) => {
          User.findById(review.authorId)
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
          reviews.map((review, index) => {
            return { review, author: authors[index] };
          })
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// @route    POST "/"
// @desc.    Add new review
// @access   Private
router.post("/", auth, (req, res) => {
  const { title, content, episodeId } = req.body;

  // Simple validation of body data
  if (!title || !content) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  if (!episodeId) {
    return res
      .status(400)
      .json({ msg: "Did not receive ID of episode you want to review" });
  }

  // Fetch episode data
  client
    .fetchEpisodeById({ id: episodeId })
    .then((response) => {
      const episode = {
        id: response.data.id,
        title: response.data.title,
        date: new Date(response.data.pub_date_ms),
        thumbnail: response.data.thumbnail,
        podcast: {
          id: response.data.podcast.id,
          title: response.data.podcast.title,
        },
      };

      // Create review object
      const newReview = new Review({
        episode,
        title,
        content,
        authorId: req.user.id,
      });

      // Add review to database
      newReview.save().then((review) => {
        res.json(review);
      });

      // Get user to check if this episode must be added to his episodes array
      User.findById(req.user.id).then((user) => {
        // Checks if episodes array includes episode
        if (!user.episodes.find((e) => e.episode.id === episodeId)) {
          // Add episode to user's episodes array
          User.findOneAndUpdate(
            { _id: req.user.id },
            {
              $push: {
                episodes: { episode, like: false, episodeId: episode.id },
              },
            }
          )
            .then(() => {
              return;
            })
            .catch((err) => {
              return console.log(err);
            });
        }
        return;
      });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(400)
        .json({ msg: "Episode with that ID does not exist" });
    });
});

// @route    DELETE "/:reviewId"
// @desc.    Delete existing review
// @access   Private
router.delete("/:reviewId", auth, (req, res) => {
  const reviewId = req.params.reviewId;
  const userId = req.user.id;

  // Validation of reviewId
  if (!mongoose.isValidObjectId(reviewId)) {
    return res
      .status(400)
      .json({ msg: "The ID of the review you want to delete is invalid" });
  }

  Review.findById(reviewId)
    .then((review) => {
      if (!review) {
        return res.status(400).json({ msg: "There is no review with this ID" });
      }

      // Check if user is authorized to delete this review
      if (review.authorId !== userId) {
        return res.status(401).json({
          msg: "You are unautorized to do this; You can only delete your own reviews",
        });
      }

      // Delete review from database
      Review.deleteOne({ _id: reviewId })
        .then(() => {
          return res.json({
            msg: `Successfully deleted review with the ID ${reviewId}`,
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

// @route    GET "/?skip=xxx"
// @desc.    Get last week's reviews (sorted by totalLikes)
// @access   Public
router.get("/", (req, res) => {
  let skip = Number(req.query.skip) || 0;
  if (skip === NaN) {
    skip = 0;
  }

  Review.find(
    { date: { $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000) } },
    {},
    { skip, limit: 10, sort: { totalLikes: -1 } }
  )
    .then((reviews) => {
      // Add author objects to review objects for the response JSON
      addAuthorObjects(reviews).then((reviewsWithAuthorObject) => {
        return res.json(reviewsWithAuthorObject);
      });
    })
    .catch((err) => {
      return console.log(err);
    });
});

// @route    GET "/:episodeId?skip=xxx"
// @desc.    Get reviews of an episode (sorted by totalLikes)
// @access   Public
router.get("/:episodeId", (req, res) => {
  const episodeId = req.params.episodeId;
  let skip = Number(req.query.skip) || 0;
  if (skip === NaN) {
    skip = 0;
  }

  Review.find(
    { "episode.id": episodeId },
    {},
    { skip, limit: 10, sort: { totalLikes: -1 } }
  )
    .then((reviews) => {
      // Add author objects to review objects for the response JSON
      addAuthorObjects(reviews).then((reviewsWithAuthorObject) => {
        return res.json(reviewsWithAuthorObject);
      });
    })
    .catch((err) => {
      return console.log(err);
    });
});

// @route    GET "/:episodeId?skip=xxx"
// @desc.    Get reviews of a user (sorted by date)
// @access   Public
router.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  let skip = Number(req.query.skip) || 0;
  if (skip === NaN) {
    skip = 0;
  }

  Review.find({ authorId: userId }, {}, { skip, limit: 10, sort: { date: -1 } })
    .then((reviews) => {
      // Add author objects to review objects for the response JSON
      addAuthorObjects(reviews).then((reviewsWithAuthorObject) => {
        return res.json(reviewsWithAuthorObject);
      });
    })
    .catch((err) => {
      return console.log(err);
    });
});

module.exports = router;
