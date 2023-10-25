const router = require('express').Router();

router.get("/", (req, res) => {
    res.send({message: 'Welcome from users!'});
})

module.exports = router;