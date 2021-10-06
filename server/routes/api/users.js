const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../models/User");
const Review = require("../../models/Review");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const auth = require("../../middleware/auth");
const { Client } = require("podcast-api");

// Init podcast API client; See documentation: https://www.listennotes.com/api/docs/
const client = Client({ apiKey: config.get("listenApiKey") });

// Email validation
const validateEmail = (email) => {
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!email) {
    return { msg: "'Email' field cannot be empty" };
  }

  if (typeof email !== "string") {
    return { msg: "'Email' has to be a string" };
  }

  if (email.length > 50) {
    return { msg: "Your email cannot be longer than 50 characters" };
  }

  if (!email.match(regexEmail)) {
    return { msg: "Please enter a valid email" };
  }

  return null;
};

// Username validation
const validateUsername = (username) => {
  const regexUsername = /^(\w|\.|-)+$/;

  if (!username) {
    return { msg: "'Username' field cannot be empty" };
  }

  if (typeof username !== "string") {
    return { msg: "'Username' has to be a string" };
  }

  if (username.length < 3) {
    return { msg: "Your username has to have at least 3 characters" };
  }

  if (username.length > 30) {
    return { msg: "Your username cannot be longer than 30 characters" };
  }

  if (!username.match(regexUsername)) {
    return {
      msg: "Your username can only include letters, numbers, dots, underscores or dashes",
    };
  }

  if (username.toUpperCase() === username.toLowerCase()) {
    return { msg: "Your username has to include at least 1 letter" };
  }

  return null;
};

// Password validation
const validatePassword = (password) => {
  if (!password) {
    return { msg: "'Password' field cannot be empty" };
  }

  if (typeof password !== "string") {
    return { msg: "'Password' has to be a string" };
  }

  if (password.length < 6) {
    return { msg: "Your password has to have at least 6 characters" };
  }

  if (password.length > 50) {
    return { msg: "Your password cannot be longer than 50 characters" };
  }

  return null;
};

// @route    POST "/"
// @desc.    Register new user
// @access   Public
router.post("/", (req, res) => {
  const { email, password } = req.body;
  const username =
    typeof req.body.username === "string"
      ? req.body.username.toLowerCase()
      : undefined;

  // Validate email
  const emailError = validateEmail(email);
  if (emailError) {
    return res.status(400).json(emailError);
  }

  // Validate username
  const usernameError = validateUsername(username);
  if (usernameError) {
    return res.status(400).json(usernameError);
  }

  // Validate password
  const passwordError = validatePassword(password);
  if (passwordError) {
    return res.status(400).json(passwordError);
  }

  // Check if username is already taken
  User.findOne({ username }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "Username is already taken" });
    }

    // Check if user with that email already exists
    User.findOne({ email }).then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ msg: "User with that email already exists" });
      }

      const newUser = { username, email, password };

      // Create hashed password
      bcrypt.hash(newUser.password, 10, (err, hashedPassword) => {
        if (err) {
          throw err;
        }
        newUser.password = hashedPassword;
        new User(newUser).save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) {
                throw err;
              }
              res.json({
                token,
                user: {
                  id: user.id,
                  username: user.username,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

// @route    GET "/:username"
// @desc.    Get user data by username
// @access   Public
router.get("/:username", (req, res) => {
  const username = req.params.username;

  // Fetch user data from the database
  User.findOne({ username })
    .select("-password")
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ msg: "Could not find user with that username" });
      }
      return res.json(user);
    });
});

// @route    PUT "/follow"
// @desc.    Follow user
// @access   Private
router.put("/follow", auth, (req, res) => {
  const { userId } = req.body;

  // Simple validation
  if (!userId) {
    return res.status(400).status({ msg: "UserId cannot be undefined" });
  }

  // Check if user wants to follow himself
  if (userId === req.user.id) {
    return res.status(400).json({ msg: "You can not follow yourself" });
  }

  if (!mongoose.isValidObjectId(userId)) {
    return res
      .status(400)
      .json({ msg: "The id of the user you want to follow is invalid" });
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ msg: `Could not find the user with the ID ${userId}` });
      }

      if (user.followers && user.followers.includes(req.user.id)) {
        return res.status(400).json({ msg: "You already follow this user" });
      }

      User.findOneAndUpdate(
        { _id: req.user.id },
        { $push: { following: userId } }
      )
        .then(() => {
          User.findOneAndUpdate(
            { _id: userId },
            { $push: { followers: req.user.id } }
          )
            .then(() => {
              return res.json({
                msg: `Successfully followed the user with the ID ${userId}`,
              });
            })
            .catch((err) => {
              return console.log(err);
            });
        })
        .catch((err) => {
          return console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route    PUT "/unfollow"
// @desc.    Unfollow user
// @access   Private
router.put("/unfollow", auth, (req, res) => {
  const { userId } = req.body;

  // Simple validation
  if (!userId) {
    return res.status(400).json({ msg: "UserId cannot be undefined" });
  }

  // Check if user wants to unfollow himself
  if (userId === req.user.id) {
    return res.status(400).json({ msg: "You can not unfollow yourself" });
  }

  if (!mongoose.isValidObjectId(userId)) {
    return res
      .status(400)
      .json({ msg: "The id of the user you want to unfollow is invalid" });
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ msg: `Could not find the user with the ID ${userId}` });
      }

      if (user.followers && !user.followers.includes(req.user.id)) {
        return res.status(400).json({
          msg: "You do not follow this user, therefore you can not unfollow",
        });
      }

      User.findOneAndUpdate(
        { _id: req.user.id },
        { $pull: { following: userId } }
      )
        .then(() => {
          User.findOneAndUpdate(
            { _id: userId },
            { $pull: { followers: req.user.id } }
          )
            .then(() => {
              return res.json({
                msg: `Successfully unfollowed user with id ${userId}`,
              });
            })
            .catch((err) => {
              return console.log(err);
            });
        })
        .catch((err) => {
          return console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Expand minimized user objects by including more user properties
const expandMinUsers = (minUsers) => {
  return new Promise((resolve, reject) => {
    const promiseArr = minUsers.reduce((total, minUser) => {
      total.push(
        new Promise((resolve, reject) => {
          User.findById(minUser._id)
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
      .then((users) => {
        resolve(
          minUsers.map((minUser, index) => {
            return {
              ...users[index].toObject(),
              totalReviews: minUser.totalReviews,
            };
          })
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// @route    GET "/most-popular-reviewers"
// @desc.    Get most popular reviewers of all time
// @access   Public
router.get("/most-popular-reviewers", (req, res) => {
  Review.aggregate([
    { $match: {} },
    { $group: { _id: "$authorId", totalReviews: { $sum: 1 } } },
    { $sort: { totalReviews: -1 } },
  ])
    .then((minUsers) => {
      expandMinUsers(minUsers)
        .then((expandedUsers) => {
          return res.json(expandedUsers);
        })
        .catch((err) => {
          return console.log(err);
        });
    })
    .catch((err) => {
      return console.log(err);
    });
});

// @route    Put "/add-favorite-podcast"
// @desc.    Add new favorite podcast
// @access   Private
router.put("/add-favorite-podcast", auth, (req, res) => {
  const { podcastId } = req.body;

  // Simple validation
  if (!podcastId) {
    return res.status(400).json({ msg: "The podcastId cannot be undefined" });
  }

  User.findOne({ _id: req.user.id })
    .then((user) => {
      // Check if user has already marked this podcast as favorite
      if (
        user.favoritePodcasts.find(
          (favoritePodcast) => favoritePodcast.id === podcastId
        )
      ) {
        return res.status(400).json({
          msg: `You have already marked the podcast with the ID ${podcastId} as one of your favorite podcasts`,
        });
      }

      // Check if user has already reached the maximum of 5 favorite podcasts
      if (user.favoritePodcasts.length >= 5) {
        return res
          .status(403)
          .json({ msg: "You can have max. 5 favorite podcasts" });
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

          // Add podcast to favoritePodcasts array in the database
          User.findOneAndUpdate(
            { _id: req.user.id },
            { $push: { favoritePodcasts: podcast } },
            { new: true }
          )
            .select("-password")
            .then((updatedUser) => {
              return res.json(updatedUser);
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

// @route    Put "/remove-favorite-podcast"
// @desc.    Remove favorite podcast
// @access   Private
router.put("/remove-favorite-podcast", auth, (req, res) => {
  const { podcastId } = req.body;

  // Simple validation
  if (!podcastId) {
    return res.status(400).json({ msg: "The podcastId cannot be undefined" });
  }

  User.findOne({ _id: req.user.id })
    .then((user) => {
      const podcastToRemove = user.favoritePodcasts.find(
        (podcast) => podcast.id === podcastId
      );

      // Check if user has marked the podcast as favorite
      if (!podcastToRemove) {
        return res.status(403).json({
          msg: `You have not marked the podcast with the ID ${podcastId} as one of your favorite podcasts`,
        });
      }

      // Remove podcast from favoritePodcasts array in the database
      User.findOneAndUpdate(
        { _id: req.user.id },
        { $pull: { favoritePodcasts: podcastToRemove } },
        { new: true }
      )
        .select("-password")
        .then((updatedUser) => {
          return res.json(updatedUser);
        })
        .catch((err) => {
          return console.log(err);
        });
    })
    .catch((err) => {
      return console.log(err);
    });
});

// @route    Put "/location"
// @desc.    Set location of user
// @access   Private
router.put("/location", auth, (req, res) => {
  const { newLocation } = req.body;

  // Simple validation
  if (
    (!newLocation && newLocation !== null) ||
    typeof newLocation !== "string"
  ) {
    return res.status(400).json({ msg: "Please enter a valid location" });
  }

  // Update location in database
  User.findOneAndUpdate(
    { _id: req.user.id },
    { location: newLocation },
    { new: true }
  )
    .select("-password")
    .then((updatedUser) => {
      return res.json(updatedUser);
    })
    .catch((err) => {
      return console.log(err);
    });
});

// @route    Put "/website"
// @desc.    Set website of user
// @access   Private
router.put("/location", auth, (req, res) => {
  const { newWebsite } = req.body;

  // Simple validation
  if (validator.isURL(newWebsite)) {
    return res.status(400).json({ msg: "Please enter a valid website" });
  }

  // Update location in database
  User.findOneAndUpdate(
    { _id: req.user.id },
    { website: newWebsite },
    { new: true }
  )
    .select("-password")
    .then((updatedUser) => {
      return res.json(updatedUser);
    })
    .catch((err) => {
      return console.log(err);
    });
});

module.exports = router;
