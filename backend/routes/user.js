const express = require('express')
const { requireLogin, authMiddleware } = require('../controllers/auth')
const { read } = require('../controllers/user')

const router = express.Router()

router.get('/profile', requireLogin, authMiddleware, read)

module.exports = router
