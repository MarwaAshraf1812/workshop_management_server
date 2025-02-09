const express = require("express");
const ProfileController = require("../controllers/Profile.controller");
const Authorization = require('../middlewares/Auth.middleware')

const router = express.Router();

router.route('/:email').get(ProfileController.getProfile)
router.route('/').post(Authorization.userAuthorization, ProfileController.createProfile)

module.exports = router