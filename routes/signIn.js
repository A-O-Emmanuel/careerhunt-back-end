const express = require('express');

const router = express.Router();


router.post('/', (req, res) => {
    const signInInfo = {
        email: req.body.email,
        password: req.body.password
    }
    
    console.log(signInInfo)
    res.send(signInInfo)
})

module.exports = router;