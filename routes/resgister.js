const {User} = require('../models/user');
const express = require('express');
const router = express.Router()


router.post('/', async (req, res) => {
    // const { error } = validateUser(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already registered.');
    
    if (req.body.firstName < 1) return res.send('firstName can not be empty')

    if (req.body.lastName < 1) return res.send('lastname can not be empty')
    
    if (req.body.email.includes('@') === false) return res.send('Please enter a valid email address')

    if (req.body.password !== req.body.confirm) return res.send('passwords must match')

    user = new User ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })

    await user.save();

    res.send(user);
})

module.exports = router;