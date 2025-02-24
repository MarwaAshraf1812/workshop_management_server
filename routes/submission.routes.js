const express = require('express');
const SubmissionController = require('../controllers/Submission.controller');

const router = express.Router();

router.route('/').post(SubmissionController.submitAssignment)
router.route('/:student_id/:assignment_id').get(SubmissionController.getStudentAssignmentSubmission)
router.route('/:student_id').get(SubmissionController.getStudentSubmissions)
router.route('/:submission_id').put(SubmissionController.addFeedback)

module.exports = router;