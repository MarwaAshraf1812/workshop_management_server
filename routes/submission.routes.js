const express = require('express');
const SubmissionController = require('../controllers/Submission.controller');
const { Authorization, ROLES } = require("../middlewares/Auth.middleware");

const ASSIGNMENT_ROLES = [ROLES.ADMIN, ROLES.MODERATOR, ROLES.INSTRUCTOR];

const STUDENT_ROLES = [
  ROLES.STUDENT,
  ROLES.USER,
  ROLES.INSTRUCTOR,
  ROLES.MODERATOR,
  ROLES.ADMIN,
];

const router = express.Router();

router.route('/').post(
  Authorization.verifyToken,
  Authorization.checkRoles(STUDENT_ROLES),
  SubmissionController.submitAssignment)
router.route('/:student_id/:assignment_id').get(
  Authorization.verifyToken,
  Authorization.checkRoles(STUDENT_ROLES),
  SubmissionController.getStudentAssignmentSubmission)
router.route('/:student_id').get(
  Authorization.verifyToken,
  Authorization.checkRoles(STUDENT_ROLES),
  SubmissionController.getStudentSubmissions)
router.route('/:submission_id').put(
  Authorization.verifyToken,
  Authorization.checkRoles(ASSIGNMENT_ROLES),
  SubmissionController.addFeedback)

module.exports = router;