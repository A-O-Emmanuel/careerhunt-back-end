const _ = require('lodash');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router()


router.post('/', async (req, res) => {

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already registered.');
    
    if (req.body.firstName < 1) return res.send('firstName can not be empty')

    if (req.body.lastName < 1) return res.send('lastname can not be empty')
    
    if (req.body.email.includes('@') === false) return res.send('Please enter a valid email address')

    if (req.body.password !== req.body.confirm) return res.send('passwords must match')

    user = new User (_.pick(req.body, ['firstName', 'lastName', 'email', 'password']));

    await user.save();

    res.send(_.pick(user, ['_id', 'firstName', 'lastName', 'email']));
});

module.exports = router;