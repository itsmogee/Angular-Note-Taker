const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User Created!",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Invalid Authentication credentials",
        });
      });
  });
};

exports.userLogin = (req, res, next) => {
  // Find if email exists
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Authentication failed" });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userID: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "10h" },
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userID: fetchedUser._id,
      });
    })
    .catch((err) => {
      res.status(401).json({
        message: "Invalid Authentication credentials ",
      });
    });
};
