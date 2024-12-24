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
    if (user) return res.status(400).json({message:'User already registered.', id:'3'});

    if (req.body.password !== req.body.confirm) return res.status(422).json({message:'Passwords must match', id:'2'})
    
    user = new User (_.pick(req.body, ['firstname', 'lastname', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    //res.send(_.pick(user, ['_id', 'firstname', 'lastname', 'email']));
    res.status(201).json({message:`You've successfully registered`,id:'1'})
});

module.exports = router;