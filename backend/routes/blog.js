const express = require('express')
const { create } = require('../controllers/blog')
const { requireLogin, adminMiddleware } = require('../controllers/auth')
const router = express.Router()

// router.get('/blogs', time)
// router.get('/blog/:slug', time)
router.post('/blog', requireLogin, adminMiddleware, create)
// router.delete('/blog/:slug', time)

module.exports = router
