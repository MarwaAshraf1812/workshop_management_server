const express = require('express');
const SubmissionController = require('../controllers/Submission.controller');

const router = express.Router();

router.route('/').post(SubmissionController.submitAssignment)
router.route('/:student_id/:assignment_id').get(SubmissionController.getStudentAssignmentSubmission)
router.route('/give_feedback/:submission_id').put(SubmissionController.addFeedback)
router.route('/get_student_submissions/:student_id').get(SubmissionController.getStudentSubmissions)

module.exports = router;