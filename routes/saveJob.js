const e = require('express');
const auth = require('../middleware/auth')
const {User} = require('../models/user');

const express = require('express');
const router = express.Router();



router.post('/', auth,  async (req, res) => {
    try {const jobInfo = {
        jobId: req.body.jobId,
        jobTitle: req.body.jobTitle,
        company: req.body.company,
        jobLocation: req.body.jobLocation,
        salayMax: req.body.salaryMax,
        salaryMin: req.body.salaryMin,
        description: req.body.description,
        contract: req.body.contract,
        applyLink: req.body.applyLink,
    }

    const user = await User.findById(req.user._id).select('-password');

    if (!user) return res.json('User not found')

    //const findJob =  user.jobs.jobId.includes(jobInfo.jobId)
  
    for (let i = 0; i < user.jobs.length; i++) {
        if (user.jobs[i].jobId == jobInfo.jobId) {
            return res.json('Job already saved')
        }
    }

    user.jobs.push(jobInfo)
    user.save()
    res.json('job saved...')
    

} catch(err) {
    res.json(err)
}
})


module.exports = router;