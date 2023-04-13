const router = require("express").Router();

// Database Models:
const User = require("../models/User");

// Password Encryption Library:
const bcrypt = require("bcrypt");

// REGISTER:
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN:
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    // user not found:
    if (!user) return res.status(400).json("Incorrect Username/Password");

    // password not matching:
    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) return res.status(400).json("Incorrect Username/Password");

    // user found and password matched:
    /* taking out password field from the data to be send to the front-end.
    we cannot directly takeout the required properties from user, we have to 
    use user._doc to take required properties. */
    const { password, ...user_without_password } = user._doc;

    return res.status(200).json(user_without_password);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
