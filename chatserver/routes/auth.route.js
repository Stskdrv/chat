const router = require('express').Router();
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const errorHandler = require('../utils/errorHandler');

router.post("/signup", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({
            message: 'User was created', 
            newUser
        });
    } catch (e) {
        console.log(e);
        errorHandler(e, res);
    }
});

router.post("/signin", async (req, res) => {
    console.log(req.body.password);

    try {
        const user = await User.findOne({username: req.body.username});
        
        if (!user) {
            return res.status(404).json({
                message: 'Such user do not exist, please sign up'
            });
        };

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                message: 'Wrong password'
            });
        };

        return res.status(200).json({
            message: 'Succesfully logged in', 
            username: user.username,
        });
    } catch (e) {
        console.log(e);
        errorHandler(e, res);
    }
});





module.exports = router;