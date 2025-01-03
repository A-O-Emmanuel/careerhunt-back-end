const jwt = require('jsonwebtoken')
const env = require('dotenv')
const mongoose = require('mongoose');

env.config()

mongoose.connect(process.env.MONGODB)
    .then(() => console.log('Succesfully connected to database..'))
    .catch((err) => console.log(err))


const jobSchema = new mongoose.Schema({
    jobId: String,
    jobTitle: String,
    company: String,
    jobLocation: String || Number, 
    salaryMax: String || Number,
    salaryMin: String || Number,
    description: String,
    contract: String,
    applyLink: String
})

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },

    jobs: [jobSchema]

})


const User = mongoose.model('User', userSchema)


exports.User = User;