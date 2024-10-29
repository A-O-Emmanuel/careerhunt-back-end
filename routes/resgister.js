const {User} = require('../models/user')
const express = require('express');
const router = express.Router()


router.post('/', (req, res) => {
    const regInfo = {
        email: req.body.email,
        password: req.body.password,
        confirm: req.body.confirm
    }
    console.log(regInfo)
    res.send(regInfo)
})

module.exports = router;