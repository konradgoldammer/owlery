const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// @route    POST "/"
// @desc.    Register new user
// @access   Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
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
              user: { id: user.id, name: user.name, email: user.email },
            });
          }
        );
      });
    });
  });
});

module.exports = router;
