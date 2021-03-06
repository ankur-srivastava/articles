const {check} = require('express-validator')

exports.userSignupValidator = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Please enter a valid email'),
    check('password').isLength({min: 6}).withMessage('Password must be of atleast 6 characters')
]

exports.userLoginValidator = [
    check('email').isEmail().withMessage('Please enter a valid email'),
    check('password').isLength({min: 6}).withMessage('Password must be of atleast 6 characters')
]
