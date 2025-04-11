const express = require('express');
const LeaderboardController = require('../controllers/Leaderboard.controller');
const { Authorization, ROLES } = require("../middlewares/Auth.middleware");

const LEADERBOARD_ROLES = [ROLES.ADMIN, ROLES.MODERATOR, ROLES.INSTRUCTOR];
const STUDENT_ROLES = [
  ROLES.STUDENT,
  ROLES.INSTRUCTOR,
  ROLES.MODERATOR,
  ROLES.ADMIN,
];


const router = express.Router();
router.route('/list_all').get(
  Authorization.verifyToken,
  Authorization.checkRoles(LEADERBOARD_ROLES),
  LeaderboardController.listAllRanks)

router.route('/:student_id').get(
  Authorization.verifyToken,
  Authorization.checkRoles(STUDENT_ROLES),
  LeaderboardController.getStudentBoard)

module.exports = router