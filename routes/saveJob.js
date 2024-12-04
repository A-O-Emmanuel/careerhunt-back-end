const auth = require('../middleware/auth')
const {User} = require('../models/user');

const express = require('express');
const router = express.Router();



router.post('/', auth,  async (req, res) => {
    try {const jobInfo = {
        jobTitle: req.body.jobTitle,
        company: req.body.compay,
        jobLocation: req.body.jobLocation,
        salarMax: req.body.salaryMax,
        salaryMin: req.body.salaryMin,
        description: req.body.description,
        contract: req.body.contract,
        applyLink: req.body.applyLink,
    }
    const user = await User.findById(req.user._id).select('-password');
    user.jobs.push(jobInfo)
    user.save()
    res.json('job saved...')
} catch(err) {
    res.json(err)
}
})


module.exports = router;