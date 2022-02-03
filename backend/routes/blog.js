const express = require('express')
const { list, read, create, listBlogsCategoriesTags, remove, update } = require('../controllers/blog')
const { requireLogin, adminMiddleware } = require('../controllers/auth')
const router = express.Router()

router.get('/blogs', list)
router.get('/blog/:slug', read)

router.post('/blog', requireLogin, adminMiddleware, create)
// This is a GET request, but we may have to send additional data to load more, in body
router.post('/blogs-cetegories-tags', listBlogsCategoriesTags)

router.delete('/blog/:slug', requireLogin, adminMiddleware, remove)
router.put('/blog/:slug', requireLogin, adminMiddleware, update)

module.exports = router
