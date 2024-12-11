const auth = require('../middleware/auth')
const {User} = require('../models/user');
const express = require('express');

const router = express.Router();

router.delete('/', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    const job = user.jobs.remove(req.body.id)
    user.save()
    res.json('Successfully removed')   
})

module.exports = router;