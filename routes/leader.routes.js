const express = require('express');
const LeaderboardController = require('../controllers/Leaderboard.controller');

const router = express.Router();

router.route('/:student_id').get(LeaderboardController.getStudentBoard)
router.route('/list_all').get(LeaderboardController.listAllRanks)

module.exports = router