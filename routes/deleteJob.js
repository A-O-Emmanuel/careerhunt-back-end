const auth = require('../middleware/auth')
const {User} = require('../models/user');
const express = require('express');

const router = express.Router();

router.delete('/', auth, async (req, res) => {
    const id = req.body.id;
    const user = await User.findById(req.user._id).select('-password');
    const job = user.jobs.id(id)
    const remove = delete(job)
    user.save()
    res.json(remove)   
})

module.exports = router;