const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/careerHuntUser')
    .then(() => console.log('Succesfully connected to database..'))
    .catch((err) => console.log(err))


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: Number
})

const User = mongoose.model('User', userSchema)


module.exports.mongoose;
module.exports.User;