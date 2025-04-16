const express = require("express");
const SubmissionController = require("../controllers/Submission.controller");
const { Authorization } = require("../middlewares/Auth.middleware");
const { ADMIN_AUTHORITY, STUDENT_ROLES } = require('../utils/UserRole');

const router = express.Router();

/**
 * @route   POST /api/submissions
 * @desc    Submit an assignment
 * @access  Private (Students and above)
 */
router.post(
  "/",
  Authorization.verifyToken,
  Authorization.checkRoles(STUDENT_ROLES),
  SubmissionController.submitAssignment
);

/**
 * @route   GET /api/submissions/:student_id/:assignment_id
 * @desc    Get specific assignment submission by student
 * @access  Private (Students and above)
 */
router.get(
  "/:student_id/:assignment_id",
  Authorization.verifyToken,
  Authorization.checkRoles(STUDENT_ROLES),
  SubmissionController.getStudentAssignmentSubmission
);

/**
 * @route   GET /api/submissions/:student_id
 * @desc    Get all submissions for a student
 * @access  Private (Students and above)
 */
router.get(
  "/:student_id",
  Authorization.verifyToken,
  Authorization.checkRoles(STUDENT_ROLES),
  SubmissionController.getStudentSubmissions
);

/**
 * @route   PUT /api/submissions/:submission_id
 * @desc    Add feedback to a submission
 * @access  Private (Instructors, Moderators, Admins)
 */
router.put(
  "/:submission_id",
  Authorization.verifyToken,
  Authorization.checkRoles(ADMIN_AUTHORITY),
  SubmissionController.addFeedback
);

module.exports = router;
