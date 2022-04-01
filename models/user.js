const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

//validator
const validator = require('validator');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username is required',
        trim: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Invalid Email!')
            }
        },
    },
    password: {
        type: String,
        trim: true
    }
})

userSchema.plugin(plm)

module.exports = mongoose.model('User', userSchema)