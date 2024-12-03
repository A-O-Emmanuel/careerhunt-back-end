const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/careerHuntUser')
    .then(() => console.log('Succesfully connected to database..'))
    .catch((err) => console.log(err))


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
    
})


const User = mongoose.model('User', userSchema)


exports.User = User;