const express = require('express')
const AuthController = require('../controllers/Auth.controller')
const rateLimit = require("express-rate-limit");
const router = express.Router()

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Please try again after 10 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});

router.route('/').post(AuthController.register)
router.route('/login').post(
  loginLimiter,
  AuthController.authenticate)

module.exports = router