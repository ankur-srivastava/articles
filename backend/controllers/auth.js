const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const User = require('../models/user')

exports.signup = (req, res)=>{
    const { name, email, password } = req.body
    User.findOne({email}).exec((error, user) => {
        if(user) {
            return res.status(400).json({
                error: 'Email exists'
            })
        }
        let username = shortId.generate()
        let profile = `${process.env.CLIENT_URL}/profile/${username}`

        let newUser = new User({name, email, password, profile, username})
        newUser.save((err, user) => {
            if(err) {
                return res.status(400).json({error: err})
            }
            // res.json({
            //     user
            // })
            res.json({
                message: 'Signed up successfully'
            })
        })
    })
}

exports.login = (req, res)=>{
    const { email, password } = req.body
    User.findOne({email}).exec((error, user) => {
        if(error || !user) {
            res.status(400).json({
                error: "User does not exist. Please signup."
            })
        }
        if(!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match'
            })
        }
        // On Success - Generate JWT
        const token = jwt.sign({_id: user._id}, 'QAWRET', {expiresIn: '1d'})
        res.cookie('token', token, {expiresIn: '1d'})
        const { _id, username, name, email, role } = user
        return res.json({
            token,
            user: { _id, username, name, email, role }
        })
    })
}

exports.logout = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "Logged out successfully"
    })
}

exports.requireLogin = expressJwt({
    secret: 'QAWRET',
    algorithms: ["HS256"],
    userProperty: "auth",
})
