const express = require("express");
const router = express.Router();
const config = require("config");
const User = require("../../models/User");
const Review = require("../../models/Review");
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

// Adds meta data to episode objects fetched from listen API (number of reviews, number of listeners)
const addMetaData = (episodes) => {
  return new Promise((resolve, reject) => {
    const promiseArr = episodes.reduce((total, episode) => {
      total.push(
        new Promise((resolve, reject) => {
          const newMetaData = {};
          countReviews(episode.id)
            .then((totalReviews) => {
              newMetaData.totalReviews = totalReviews;
              countListeners(episode.id)
                .then((totalListeners) => {
                  newMetaData.totalListeners = totalListeners;
                  resolve(newMetaData);
                })
                .catch((err) => {
                  reject(err);
                });
            })
            .catch((err) => {
              reject(err);
            });
        })
      );
      return total;
    }, []);
    Promise.all(promiseArr)
      .then((newMetaData) => {
        resolve(
          episodes.map((episode, index) => {
            return { ...episode, ...newMetaData[index] };
          })
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// @route    GET "/most-popular"
// @desc.    Get most popular podcasts of all time (based on how often episodes of them got reviewed)
// @access   Public
router.get("/most-popular", (req, res) => {
  Review.aggregate([
    { $match: {} },
    {
      $group: {
        _id: "$episode.podcast.id",
        totalReviews: { $sum: 1 },
        podcast: { $first: "$episode.podcast" },
      },
    },
    { $sort: { totalReviews: -1 } },
  ])
    .then((podcasts) => {
      return res.json(podcasts);
    })
    .catch((err) => {
      return console.log(err);
    });
});

// @route    GET "/trending"
// @desc.    Get trending podcast (podcast with most reviews in the last week)
// @access   Public
router.get("/trending", (req, res) => {
  Review.aggregate([
    {
      $match: {
        date: { $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000) },
      },
    },
    {
      $group: {
        _id: "$episode.podcast.id",
        totalReviews: { $sum: 1 },
        podcast: { $first: "$episode.podcast" },
      },
    },
    { $sort: { totalReviews: -1 } },
  ])
    .then((podcasts) => {
      return res.json(podcasts);
    })
    .catch((err) => {
      return console.log(err);
    });
});

// Returns the total number of reviews of an podcast
const countReviewsOfPodcast = (podcastId) => {
  return new Promise((resolve, reject) => {
    Review.countDocuments({ "episode.podcast.id": podcastId })
      .then((num) => resolve(num))
      .catch((err) => reject(err));
  });
};

// @route    GET "/:podcastId"
// @desc.    Fetch data for single podcast
// @access   Public
router.get("/:podcastId", (req, res) => {
  const podcastId = req.params.podcastId;

  // Fetch podcast data
  client
    .fetchPodcastById({ id: podcastId, sort: "recent_first" })
    .then(async (response) => {
      const podcast = response.data;
      podcast.totalReviews = await countReviewsOfPodcast(podcastId);
      podcast.episodes = await addMetaData(podcast.episodes);
      return res.json(podcast);
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(404)
        .json({ msg: `Couldn't find podcast with the ID ${podcastId}` });
    });
});

// @route    Put "/like"
// @desc.    Like podcast
// @access   Private
router.put("/like", auth, (req, res) => {
  const { podcastId } = req.body;

  // Simple validation
  if (!podcastId) {
    return res.status(400).json({ msg: "The podcastId cannot be undefined" });
  }

  User.findOne({ _id: req.user.id })
    .then((user) => {
      // Check if user has already liked this podcast
      if (
        user.likedPodcasts.find((likedPodcast) => likedPodcast.id === podcastId)
      ) {
        return res.status(400).json({
          msg: `You have already liked the podcast with the ID ${podcastId}`,
        });
      }

      // Fetch podcast data
      client
        .fetchPodcastById({ id: podcastId })
        .then((response) => {
          const podcast = {
            id: response.data.id,
            thumbnail: response.data.thumbnail,
            title: response.data.title,
          };

          // Add podcast to likedPodcasts array in the database
          User.findOneAndUpdate(
            { _id: req.user.id },
            { $push: { likedPodcasts: podcast } }
          )
            .then(() => {
              return res.json(podcast);
            })
            .catch((err) => {
              return console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          return res
            .status(404)
            .json({ msg: `Couldn't find podcast with the ID ${podcastId}` });
        });
    })
    .catch((err) => {
      return console.log(err);
    });
});

module.exports = router;
