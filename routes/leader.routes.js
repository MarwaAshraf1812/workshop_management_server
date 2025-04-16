const express = require('express');
const LeaderboardController = require('../controllers/Leaderboard.controller');
const { Authorization } = require("../middlewares/Auth.middleware");
const { STUDENT_ROLES, ADMIN_AUTHORITY } = require("../utils/UserRole");

const router = express.Router();

/**
 * @route   GET /api/leaderboard/list_all
 * @desc    List all students with their leaderboard ranks
 * @access  Private (Admins, Moderators, Instructors)
 */
router.get(
  '/list_all',
  Authorization.verifyToken,
  Authorization.checkRoles(ADMIN_AUTHORITY),
  LeaderboardController.listAllRanks
);

/**
 * @route   GET /api/leaderboard/:student_id
 * @desc    Get leaderboard info for a specific student
 * @access  Private (Students + Higher roles)
 */
router.get(
  '/:student_id',
  Authorization.verifyToken,
  Authorization.checkRoles(STUDENT_ROLES),
  LeaderboardController.getStudentBoard
);

module.exports = router;
