const auth = require('../middleware/auth')
const {User} = require('../models/user');
const express = require('express');

const router = express.Router();

router.delete('/', auth, async (req, res) => {
    const id = req.user._id
    const user = await User.deleteOne({_id: id})
    res.json(`You've successfully deleted your account..`)
})

module.exports = router;