const express = require('express')
const AuthController = require('../controllers/Auth.controller')

const router = express.Router()


router.route('/').post(AuthController.register)
router.route('/login').post(AuthController.authenticate)

module.exports = router