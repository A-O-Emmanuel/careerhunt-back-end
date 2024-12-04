const auth = require('../middleware/auth')
const {User} = require('../models/user');

const express = require('express');
const router = express.Router();


router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    const jobs = user.jobs
    console.log(jobs)
    res.json(jobs)
})

module.exports = router;