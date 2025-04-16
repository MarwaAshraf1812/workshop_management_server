const express = require("express");
const ProgressController = require("../controllers/Progress.controller");
const { Authorization } = require("../middlewares/Auth.middleware");
const { STUDENT_ROLES, ADMIN_AUTHORITY } = require("../utils/UserRole");

const router = express.Router();

/**
 * @route   GET/POST /api/progress/:student_id/:workshop_id
 * @desc    Get or create progress for a student in a workshop
 * @access  GET: All roles / POST: Admin, Moderator, Instructor
 */
router.route("/:student_id/:workshop_id")
  .get(
    Authorization.verifyToken,
    Authorization.checkRoles(STUDENT_ROLES),
    ProgressController.getProgress
  )
  .post(
    Authorization.verifyToken,
    Authorization.checkRoles(ADMIN_AUTHORITY),
    ProgressController.create
  );

/**
 * @route   DELETE /api/progress/:progress_id
 * @desc    Delete a progress record
 * @access  Private (Admin, Moderator, Instructor)
 */
router.delete(
  "/:progress_id",
  Authorization.verifyToken,
  Authorization.checkRoles(ADMIN_AUTHORITY),
  ProgressController.delete
);

/**
 * @route   PUT /api/progress/attendance/:student_id/:workshop_id
 * @desc    Mark attendance for a student
 * @access  Private (Admin, Moderator, Instructor)
 */
router.put(
  "/attendance/:student_id/:workshop_id",
  Authorization.verifyToken,
  Authorization.checkRoles(ADMIN_AUTHORITY),
  ProgressController.attend
);

/**
 * @route   PUT /api/progress/assignment_grade/:student_id/:workshop_id
 * @desc    Add assignment grade for a student
 * @access  Private (Admin, Moderator, Instructor)
 */
router.put(
  "/assignment_grade/:student_id/:workshop_id",
  Authorization.verifyToken,
  Authorization.checkRoles(ADMIN_AUTHORITY),
  ProgressController.addAssignmentGrade
);

/**
 * @route   PUT /api/progress/quiz_grade/:student_id/:workshop_id
 * @desc    Add quiz grade for a student
 * @access  Private (Admin, Moderator, Instructor)
 */
router.put(
  "/quiz_grade/:student_id/:workshop_id",
  Authorization.verifyToken,
  Authorization.checkRoles(ADMIN_AUTHORITY),
  ProgressController.addQuizGrade
);

module.exports = router;
