const router = require("express").Router();

// Database Models:
const User = require("../models/User");
const Post = require("../models/Post");

// Password Encryption Library:
const bcrypt = require("bcrypt");

// UPDATE:
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      ); // new: true -> returns us updated user rather than the previous one.

      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(401).json("You can only update your Account");
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        return res
          .status(200)
          .json("User Account and it's associated posts has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    return res.status(401).json("You can only delete your Account");
  }
});

// GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...other_details } = user._doc;
    res.status(200).json(other_details);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
