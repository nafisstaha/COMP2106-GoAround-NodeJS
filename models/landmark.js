// use Mongoose to interact with MongoDB
const mongoose = require('mongoose')

// create a schema for an Landmark document
let landmarkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
        trim: true
    },
    image: {
        type: String
    },
    location: {
        type: String,
        required: 'Location is required',
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
})

module.exports = mongoose.model('Landmark', landmarkSchema)