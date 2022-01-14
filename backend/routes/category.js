const express = require('express')
const { adminMiddleware, requireLogin } = require('../controllers/auth')
const { create, list, read, remove } = require('../controllers/category')

const { runValidation } = require("../validators")
const { createCategoryValidator } = require("../validators/category")

const router = express.Router()

router.post('/category', createCategoryValidator, runValidation, requireLogin, adminMiddleware, create)
router.get('/categories', list)
router.get('/category/:slug', read)
router.delete('/category/:slug', requireLogin, adminMiddleware, remove)

module.exports = router
