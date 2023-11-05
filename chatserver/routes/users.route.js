const User = require('../models/User.model');
const passport = require('passport');
const router = require('express').Router();

//get a user
router.get("/", passport.authenticate('jwt', {session: false}), async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    console.log(userId);
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;