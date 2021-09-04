const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../models/User");
const Review = require("../../models/Review");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const isValidEmail = (email) => {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(regexEmail)) {
    return true;
  }
  return false;
};

// @route    POST "/"
// @desc.    Register new user
// @access   Public
router.post("/", (req, res) => {
  const { email, password } = req.body;
  const name =
    typeof req.body.name === "string" ? req.body.name.toLowerCase() : undefined;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ msg: "Please enter a valid email" });
  }

  User.findOne({ name }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "Username is already taken" });
    }

    User.findOne({ email }).then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ msg: "User with that email already exists" });
      }

      const newUser = { name, email, password };

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
                  name: user.name,
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

// @route    PUT "/follow"
// @desc.    Follow user
// @access   Private
router.put("/follow", auth, (req, res) => {
  const { userId } = req.body;

  // Simple validation
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
          .status(400)
          .json({ msg: "The user you want to follow does not exist" });
      }
      if (user.followers && user.followers.includes(req.user.id)) {
        return res.status(400).json({ msg: "You already follow that user" });
      }

      User.findOneAndUpdate(
        { _id: req.user.id },
        { $push: { following: userId } },
        (err) => {
          if (err) {
            return console.log(err);
          }
          User.findOneAndUpdate(
            { _id: userId },
            { $push: { followers: req.user.id } },
            (err) => {
              if (err) {
                return console.log(err);
              }
              res.json({ msg: `Successfully followed user with id ${userId}` });
            }
          );
        }
      );
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
          .status(400)
          .json({ msg: "The user you want to unfollow does not exist" });
      }
      if (user.followers && !user.followers.includes(req.user.id)) {
        return res
          .status(400)
          .json({ msg: "You do not follow the user you want to unfollow" });
      }

      User.findOneAndUpdate(
        { _id: req.user.id },
        { $pull: { following: userId } },
        (err) => {
          if (err) {
            return console.log(err);
          }
          User.findOneAndUpdate(
            { _id: userId },
            { $pull: { followers: req.user.id } },
            (err) => {
              if (err) {
                return console.log(err);
              }
              res.json({
                msg: `Successfully unfollowed user with id ${userId}`,
              });
            }
          );
        }
      );
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

module.exports = router;
