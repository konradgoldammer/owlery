const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// @route    POST "/"
// @desc.    Authenticate user
// @access   Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with that email does not exist" });
    }

    // Check if passwords match
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        res.status(400).json({ msg: "Wrong credentials" });
      }

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
            user: { id: user.id, username: user.username, email: user.email },
          });
        }
      );
    });
  });
});

// @route    GET "/"
// @desc.    Get user data
// @access   Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
