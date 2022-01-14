const express = require('express')
const { adminMiddleware, requireLogin } = require('../controllers/auth')
const { create } = require('../controllers/category')

const { runValidation } = require("../validators")
const { createCategoryValidator } = require("../validators/category")

const router = express.Router()

router.post('/category', createCategoryValidator, runValidation, requireLogin, adminMiddleware, create)

module.exports = router
