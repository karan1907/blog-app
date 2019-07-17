const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Please Provide Your Username.'],
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'Please Provide Your Email.']
    },
    password: {
        type: String,
        required: [true, 'Please Provide Your Password.']
    }
})

UserSchema.pre('save', function(next){

    const user = this

    bcrypt.hash(user.password, 10, function(error, encrypted){
        user.password = encrypted
        next()
    })
})


const User = mongoose.model('User', UserSchema)

module.exports = User