const express = require("express");
const router = express.Router();
const config = require("config");
const User = require("../../models/User");
const Review = require("../../models/Review");
const auth = require("../../middleware/auth");
const { Client } = require("podcast-api");

// Init podcast API client; See documentation: https://www.listennotes.com/api/docs/
const client = Client({ apiKey: config.get("listenApiKey") });

// Returns the total number of reviews of an episode
const countReviews = (episodeId) => {
  return new Promise((resolve, reject) => {
    Review.countDocuments({ "episode.id": episodeId })
      .then((num) => resolve(num))
      .catch((err) => reject(err));
  });
};

// Returns the total number of listeners of an episode
const countListeners = (episodeId) => {
  return new Promise((resolve, reject) => {
    User.countDocuments({ "episodes.episodeId": episodeId })
      .then((num) => resolve(num))
      .catch((err) => reject(err));
  });
};

// @route    GET "/:episodeId"
// @desc.    Fetch data for single episode
// @access   Public
router.get("/:episodeId", (req, res) => {
  const episodeId = req.params.episodeId;

  // Fetch episode data
  client
    .fetchEpisodeById({ id: episodeId })
    .then(async (response) => {
      const episode = response.data;
      episode.totalReviews = await countReviews(episodeId);
      episode.totalListeners = await countListeners(episodeId);
      return res.json(episode);
    })
    .catch(() => {
      return res
        .status(404)
        .json({ msg: `Couldn't find episode with the ID ${episodeId}` });
    });
});

// @route    PUT "/listen"
// @desc.    Mark an episodes as listened
// @access   Private
router.put("/listen", auth, (req, res) => {
  const { episodeId } = req.body;

  // Simple validation
  if (!episodeId) {
    return res.status(400).json({ msg: "Did not receive episode ID" });
  }

  // Get user to check if this episode must be added to his episodes array
  User.findById(req.user.id).then((user) => {
    // Checks if episodes array includes episode
    if (user.episodes.find((e) => e.episode.id === episodeId)) {
      return res
        .status(400)
        .json({ msg: "You have already marked this episode as listened" });
    }

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

        // Add episode to user's episodes array
        User.findOneAndUpdate(
          { _id: req.user.id },
          {
            $push: {
              episodes: {
                episode,
                like: false,
                rating: -1,
                episodeId: episode.id,
              },
            },
          },
          { new: true }
        )
          .then((user) => {
            return res.json(user);
          })
          .catch((err) => {
            return console.log(err);
          });
      })
      .catch(() => {
        return res
          .status(404)
          .json({ msg: `Couldn't find episode with the ID ${episodeId}` });
      });
  });
});

// @route    PUT "/unlisten"
// @desc.    Mark an episodes as not listened
// @access   Private
router.put("/unlisten", auth, (req, res) => {
  const { episodeId } = req.body;

  // Simple validation
  if (!episodeId) {
    return res.status(400).json({ msg: "Did not receive episode ID" });
  }

  // Check if user has reviewed this episode, because then he shouldn't be able to mark it as not seen
  Review.findOne({ authorId: req.user.id })
    .then((reviewByUser) => {
      if (reviewByUser) {
        return res.status(400).json({
          msg: "You have reviewed this episode, therefore you can't mark it as unseen.",
        });
      }

      // Remove episode from user's episode array
      User.findOneAndUpdate(
        { _id: req.user.id },
        { $pull: { episodes: { episodeId } } },
        { new: true }
      )
        .then((user) => {
          return res.json(user);
        })
        .catch((err) => {
          return console.log(err);
        });
    })
    .catch((err) => {
      return console.log(err);
    });
});

// @route    PUT "/like"
// @desc.    Like an episode
// @access   Private
router.put("/like", auth, (req, res) => {
  const { episodeId } = req.body;

  // Simple validation
  if (!episodeId) {
    return res.status(400).json({ msg: "Did not receive episode ID" });
  }

  // Get user to check if he already marked this episode as listened
  User.findById(req.user.id).then((user) => {
    const listenedEpisode = user.episodes.find(
      (e) => e.episode.id === episodeId
    );

    // Checks if episodes array includes episode
    if (!listenedEpisode) {
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

          // Add episode to user's episodes array
          User.findOneAndUpdate(
            { _id: req.user.id },
            {
              $push: {
                episodes: {
                  episode,
                  like: true,
                  rating: -1,
                  episodeId: episode.id,
                },
              },
            },
            { new: true }
          )
            .then((user) => {
              return res.json(user);
            })
            .catch((err) => {
              return console.log(err);
            });
        })
        .catch(() => {
          return res
            .status(404)
            .json({ msg: `Couldn't find episode with the ID ${episodeId}` });
        });
    } else if (listenedEpisode) {
      // Check if user has already liked this episode
      if (listenedEpisode.like) {
        return res
          .status(400)
          .json({ msg: "You've already liked this episode" });
      }

      // Set the like property to true of the according item in the episodes array of the user
      User.findOneAndUpdate(
        { _id: req.user.id, "episodes.episodeId": episodeId },
        { $set: { "episodes.$.like": true } },
        { new: true }
      )
        .then((user) => {
          return res.json(user);
        })
        .catch((err) => {
          return console.log(err);
        });
    }
  });
});

// @route    PUT "/unlike"
// @desc.    Unlike an episode
// @access   Private
router.put("/unlike", auth, (req, res) => {
  const { episodeId } = req.body;

  // Simple validation
  if (!episodeId) {
    return res.status(400).json({ msg: "Did not receive episode ID" });
  }

  // Get user to check if he already marked this episode as listened
  User.findById(req.user.id).then((user) => {
    const listenedEpisode = user.episodes.find(
      (e) => e.episode.id === episodeId
    );

    // Checks if episodes array includes episode
    if (!listenedEpisode) {
      return res.status(400).json({
        msg: "You haven't liked this episode, therefore you can't unlike it",
      });
    }

    // Check if user has already not liked the episode
    if (!listenedEpisode.like) {
      return res.status(400).json({
        msg: "You haven't liked the episode, therefore you can't unlike it",
      });
    }

    // Set the like property to false of the according item in the episodes array of the user
    User.findOneAndUpdate(
      { _id: req.user.id, "episodes.episodeId": episodeId },
      { $set: { "episodes.$.like": false } },
      { new: true }
    )
      .then((user) => {
        return res.json(user);
      })
      .catch((err) => {
        return console.log(err);
      });
  });
});

// @route    PUT "/rate"
// @desc.    Rate an episode on a 5-star scale
// @access   Private
router.put("/rate", auth, (req, res) => {
  const { episodeId, rating } = req.body;

  // Simple validation of body data
  if (!episodeId || !rating) {
    return res.status(400).json({ msg: "Did not receive enough information" });
  }

  if (
    typeof rating !== "number" ||
    !Number.isInteger(rating) ||
    rating > 9 ||
    rating < 0
  ) {
    return res.status(400).json({ msg: "Rating value is invalid" });
  }

  // Get user to check if he already marked this episode as listened
  User.findById(req.user.id).then((user) => {
    const listenedEpisode = user.episodes.filter((item) => {
      return item.episode.id === episodeId;
    })[0];

    if (listenedEpisode) {
      if (listenedEpisode.rating === rating) {
        return res
          .status(400)
          .json({ msg: `You already gave this episode a rating of ${rating}` });
      }

      // Set rating property of the according object in the episodes array to new rating
      User.findOneAndUpdate(
        { _id: req.user.id, "episodes.episodeId": episodeId },
        { $set: { "episodes.$.rating": rating } },
        { new: true }
      )
        .then((user) => {
          return res.json(user);
        })
        .catch((err) => {
          return console.log(err);
        });
    } else if (!listenedEpisode) {
      // Create new object in user's episodes array
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

          // Add episode to user's episodes array
          User.findOneAndUpdate(
            { _id: req.user.id },
            {
              $push: {
                episodes: {
                  episode,
                  like: false,
                  rating,
                  episodeId: episode.id,
                },
              },
            },
            { new: true }
          )
            .then((user) => {
              return res.json(user);
            })
            .catch((err) => {
              return console.log(err);
            });
        })
        .catch(() => {
          return res
            .status(404)
            .json({ msg: `Couldn't find episode with the ID ${episodeId}` });
        });
    }
  });
});

// @route    PUT "/unrate"
// @desc.    Unrate an episode
// @access   Private
router.put("/unrate", auth, (req, res) => {
  const { episodeId } = req.body;

  // Simple validation
  if (!episodeId) {
    return res.status(400).json({ msg: "Did not receive episode ID" });
  }

  // Get user to check if he already marked this episode as listened
  User.findById(req.user.id).then((user) => {
    const listenedEpisode = user.episodes.find(
      (e) => e.episode.id === episodeId
    );

    // Checks if episodes array includes episode
    if (!listenedEpisode) {
      return res.status(400).json({
        msg: "You haven't rated this episode, therefore you can't unrate it",
      });
    }

    // Check if user has already not liked the episode
    if (listenedEpisode.rating === -1) {
      return res.status(400).json({
        msg: "You haven't rated this episode, therefore you can't unrate it",
      });
    }

    // Set rating property of the according object in the episodes array to -1 (no rating)
    User.findOneAndUpdate(
      { _id: req.user.id, "episodes.episodeId": episodeId },
      { $set: { "episodes.$.rating": -1 } },
      { new: true }
    )
      .then((user) => {
        return res.json(user);
      })
      .catch((err) => {
        return console.log(err);
      });
  });
});

module.exports = router;
