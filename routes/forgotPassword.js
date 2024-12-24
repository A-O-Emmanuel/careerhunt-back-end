const jwt = require('jsonwebtoken')
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();


router.patch('/', async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).json({message:'Email is invalid.', id:'1'});

    //check if passwords match
    if (req.body.newPassword !== req.body.confirm) return res.status(422).json({message:'Passwords must match', id:'2'})

    const salt = await bcrypt.genSalt(10);
    const saltedPassword = await bcrypt.hash(req.body.newPassword, salt)
    //select user password

    //replace user password with new one.


   const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(422).json({message:'Password is Invalid', id: '2'});

    const token = jwt.sign({_id: user.id}, process.env.JWTPRIVATEKEY);
    res.json({token});

})

module.exports = router;