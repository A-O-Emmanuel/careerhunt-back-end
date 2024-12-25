const jwt = require('jsonwebtoken')
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();


router.patch('/', async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).json({message:'Email is not registered.', id:'1'});

    if (req.body.newPassword !== req.body.confirm) return res.status(422).json({message:'Passwords must match', id:'2'})

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.newPassword, salt)
    await user.save()

    res.status(200).json({message:`You've successfully reset your password`, id:'3'});

})

module.exports = router;