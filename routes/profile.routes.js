const express = require("express");
const ProfileController = require("../controllers/Profile.controller");
const Authorization = require('../middlewares/Auth.middleware');

const router = express.Router();

/**
 * @route   GET /api/profile/:id
 * @desc    Get a user profile by ID
 * @access  Private (Authorized users only)
 * @permission Only the user himself or an admin can view the profile
 */
router.route('/:id')
  .get(
    Authorization.verifyToken,
    Authorization.checkOwnership((req) => req.params.id),
    ProfileController.getProfile
  );

/**
 * @route   POST /api/profile
 * @desc    Create a new user profile
 * @access  Private (Authorized users only)
 * @permission Only the user himself can create a profile
 */
router.route('/')
  .post(
    Authorization.verifyToken,
    ProfileController.createProfile
  );

module.exports = router;
