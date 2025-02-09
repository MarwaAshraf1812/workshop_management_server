const express = require('express');
const ProgressController = require('../controllers/Progress.controller');
const { default: Authorization } = require('../middlewares/Auth.middleware');

const router = express.Router();

router.route('/:student_id/:workshop_id').get(Authorization.moderatorAuthorization, ProgressController.getProgress)
router.route('/attendance/:student_id/:workshop_id').put(Authorization.moderatorAuthorization, ProgressController.attend)
router.route('/assignment_grade/:student_id/:workshop_id').put(Authorization.moderatorAuthorization, ProgressController.addAssignmentGrade)
router.route('/quiz_grade/:student_id/:workshop_id').put(Authorization.moderatorAuthorization, ProgressController.addQuizGrade)

module.exports = router;
