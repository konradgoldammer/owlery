const express = require("express");
const router = express.Router();
const config = require("config");
const Review = require("../../models/Review");
const { Client } = require("podcast-api");

// Init podcast API client; See documentation: https://www.listennotes.com/api/docs/
const client = Client({ apiKey: config.get("listenApiKey") });

// @route    GET "/:episodeId"
// @desc.    Fetch data for single episode
// @access   Public
router.get("/:episodeId", (req, res) => {
  const episodeId = req.params.episodeId;

  // Fetch episode data
  client
    .fetchEpisodeById({ id: episodeId })
    .then((response) => {
      const episode = response.data;
      // TODO: get total amount of reviews and likes
      return res.json(episode);
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(404)
        .json({ msg: `Couldn't find episode with the ID ${episodeId}` });
    });
});

module.exports = router;
