const auth = require('../middleware/auth')
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router()

router.get('/me', auth, async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})

router.post('/', async (req, res) => {

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already registered.');
    
    if (req.body.firstname < 1) return res.send('firstname can not be empty')

    if (req.body.lastname < 1) return res.send('lastname can not be empty')
    
    if (req.body.email.includes('@') === false) return res.send('Please enter a valid email address')

    if (req.body.password !== req.body.confirm) return res.send('passwords must match')
    
    user = new User (_.pick(req.body, ['firstname', 'lastname', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.send(_.pick(user, ['_id', 'firstname', 'lastname', 'email']));
});

module.exports = router;