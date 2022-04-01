const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username is required',
        trim: true,
    },
    password: {
        type: String,
        trim: true
    }
})

userSchema.plugin(plm)

module.exports = mongoose.model('User', userSchema)