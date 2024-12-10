const auth = require('../middleware/auth')
const {User} = require('../models/user');
const express = require('express');

const router = express.Router();

router.delete('/', auth, async (req, res) => {
    const user = await User.deleteOne(req.user._id).select('-password')
    console.log(user) 
})

module.exports = router;