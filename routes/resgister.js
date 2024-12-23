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
    if (user) return res.status(400).json('User already registered.');

    if (req.body.password !== req.body.confirm) return res.status(422).json('Passwords must match')
    
    user = new User (_.pick(req.body, ['firstname', 'lastname', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    //res.send(_.pick(user, ['_id', 'firstname', 'lastname', 'email']));
    res.status(201).json(`You've successfully registered, now please signin`)
});

module.exports = router;