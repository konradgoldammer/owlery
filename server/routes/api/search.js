const express = require("express");
const router = express.Router();
const config = require("config");
const User = require("../../models/User");
const { Client } = require("podcast-api");

// Init podcast API client; See documentation: https://www.listennotes.com/api/docs/
const client = Client({ apiKey: config.get("listenApiKey") });

// @route    GET "/:q"
// @desc.    Search for term "q"
// @access   Public
router.get("/", (req, res) => {
  const types = ["episode", "podcast", "user"];
  const { q, published_before, published_after } = req.query;
  const type = types.includes(req.query.type) ? req.query.type : types[0];
  let skip = Number(req.query.skip) || 0;
  if (skip === NaN) {
    skip = 0;
  }

  // Simple validation
  if (!q) {
    return res.status(400).json({ msg: "Please enter a search term" });
  }

  // Handle different search types
  if (type === types[0] || type === type[1]) {
    client
      .search({
        q,
        sort_by_date: 0,
        type,
        offset: 0,
        published_before,
        published_after,
        only_in: "title,description,author",
        safe_mode: 0,
      })
      .then((response) => {
        return res.json(response.data);
      })
      .catch((err) => {
        return console.log(err);
      });
  } else if (type === types[2]) {
    User.find({ name: { $regex: q, $options: "i" } }, {}, { limit: 1, skip })
      .then((docs) => {
        return res.json(docs);
      })
      .catch((err) => {
        return console.log(err);
      });
  }
});

module.exports = router;
