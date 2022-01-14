const express = require('express')
const { adminMiddleware, requireLogin } = require('../controllers/auth')
const { create, list, read, remove } = require('../controllers/tag')

const { runValidation } = require("../validators")
const { createTagValidator } = require("../validators/tag")

const router = express.Router()

router.post('/tag', createTagValidator, runValidation, requireLogin, adminMiddleware, create)
router.get('/tags', list)
router.get('/tag/:slug', read)
router.delete('/tag/:slug', requireLogin, adminMiddleware, remove)

module.exports = router
