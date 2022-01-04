const express = require('express')
const { signup, login, logout, requireLogin } = require('../controllers/auth')

const { runValidation } = require("../validators")
const { userSignupValidator, userLoginValidator } = require("../validators/auth")

const router = express.Router()

router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/login', userLoginValidator, runValidation, login)
router.get('/logout', logout)

// Test
router.get('/secret', requireLogin, (req, res)=>{
    res.json({
        message: 'You have access to secret page'
    })
})

module.exports = router
