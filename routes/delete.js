const express = require('express');

const router = express.Router();

router.delete('/', (req, res) => {
    const data = {
        name: req.body.name
    }
    res.send(data)
})

module.exports = router;