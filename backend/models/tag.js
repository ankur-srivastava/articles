const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        index: true
    }
}, {timestamps: true})

module.exports = new mongoose.model('Tag', tagSchema)
