const express = require("express");
const ProfileController = require("../controllers/Profile.controller");
const Authorization = require('../middlewares/Auth.middleware')

const router = express.Router();

router.route('/:id').get(ProfileController.getProfile)
router.route('/').post(ProfileController.createProfile)

module.exports = router