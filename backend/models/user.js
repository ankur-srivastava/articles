const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        max: 32,
        unique: true,
        index: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    profile: {
        type: String
    },
    hashed_password: {
        type: String
    },
    salt: {
        type: String
    },
    about: {
        type: String
    },
    role: {
        type: Number,
        trim: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    resetPasswordLink: {
        data: String,
        default: ""
    }
}, {timestamp: true})

userSchema.virtual('password')
    .set(function(password){
        this._password = password
        // generate salt
        this.salt = makeSalt()
        // encrypt password
        this.hashed_password = encryptPassword(password)
    })
    .get(function() {
        return this._password
    })

userSchema.methods = {
    encryptPassword: function(password) {
        if(!password) {
            return ''
        }
        try {

        } catch(err) {
            console.error(err)
            return ''
        }
    }
}

// convention is to have model name first letter in caps
module.exports = mongoose.model('User', userSchema)
