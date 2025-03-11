const express = require('express');
const ProgressController = require('../controllers/Progress.controller');
const { Authorization } = require('../middlewares/Auth.middleware');

const router = express.Router();

router.route('/').post(ProgressController.createProgress);

router.route('/:student_id/:workshop_id')
.get(
    // Authorization.checkRoles(['MODERATOR']), 
    ProgressController.getProgress
)

router.route('/attendance/:progress_id')
.put(
    // Authorization.checkRoles(['MODERATOR']), 
    ProgressController.attend
)

router.route('/assignment_grade/:progress_id')
.put(
    // Authorization.checkRoles(['MODERATOR']), 
    ProgressController.addAssignmentGrade
)

router.route('/quiz_grade/:progress_id')
.put(
    // Authorization.checkRoles(['MODERATOR']), 
    ProgressController.addQuizGrade
)

module.exports = router;
