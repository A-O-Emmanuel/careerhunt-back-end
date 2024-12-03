const auth = require('../middleware/auth')
const express = require('express');
const router = express.Router();


router.post('/', auth,  async (req, res) => {
    const jobInfo = {
        jobTitle: req.body.jobTitle,
        company: req.body.compay,
        jobLocation: req.body.jobLocation,
        salarMax: req.body.salaryMax,
        salaryMin: req.body.salaryMin,
        description: req.body.description,
        contract: req.body.contract,
        applyLink: req.body.applyLink,
    }
    res.send(jobInfo)
})

module.exports = router;