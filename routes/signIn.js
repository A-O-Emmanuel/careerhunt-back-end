const jwt = require('jsonwebtoken')
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).json({message:'Email is invalid.', id:'1'});

   const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(422).json({message:'Password is Invalid', id: '2'});

    const token = jwt.sign({_id: user.id}, process.env.JWTPRIVATEKEY);
    res.json({token});

})

module.exports = router;