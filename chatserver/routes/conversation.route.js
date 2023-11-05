const router = require('express').Router();
const passport = require('passport');
const Conversation = require('../models/Conversation.model');
const errorHandler = require('../utils/errorHandler');


//create conversation
router.post('/', passport.authenticate('jwt', {session: false}), async (req,res) => {
    const newConv = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })

    try{
        const savedConv = await newConv.save();

        return res.status(200).json(savedConv);
    } catch (e) {
        console.log(e);
        errorHandler(e, res);
    }
});

//get conversation

router.get('/:userId', passport.authenticate('jwt', {session: false}), async (req,res) => {
   
    try{
        const conversation = await Conversation.find({members: {$in: [req.params.userId]} });

        return res.status(200).json(conversation);
    } catch (e) {
        console.log(e);
        errorHandler(e, res);
    }
});



module.exports = router;