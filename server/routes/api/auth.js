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
  const { data, password } = req.body;

  // Simple validation
  if (!data || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  if (typeof data !== "string" || typeof password !== "string") {
    return res
      .status(400)
      .json({ msg: "'Username' and 'Password' have to be strings" });
  }

  const query = data.includes("@") ? { email: data } : { username: data };

  // Login via email / username
  User.findOne(query).then((user) => {
    if (!user) {
      return res.status(400).json({
        msg: `User with the ${
          data.includes("@") ? "email" : "username"
        } ${data} does not exist`,
      });
    }

    // Check if passwords match
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        res.status(400).json({ msg: "Wrong credentials" });
      }

      jwt.sign({ id: user.id }, config.get("jwtSecret"), (err, token) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "Could not create JWT token" });
        }

        // Convert Mongo object to regular object
        const userObject = user.toObject();

        res.json({
          token,
          user: { ...userObject, password: undefined },
        });
      });
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
