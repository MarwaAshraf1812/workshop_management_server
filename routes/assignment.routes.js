const express = require("express");
const AssignmentController = require("../controllers/assignment.controller");
const { Authorization } = require("../middlewares/Auth.middleware");
const { ADMIN_AUTHORITY, STUDENT_ROLES } = require("../utils/UserRole");

const router = express.Router();

/**
 * @route   POST /api/assignments
 * @desc    Create a new assignment
 * @access  Private (Admin roles only)
 */
router.post(
  "/",
  Authorization.verifyToken,
  Authorization.checkRoles(ADMIN_AUTHORITY),
  AssignmentController.addNewAssignment
);

/**
 * @route   GET /api/assignments/workshop
 * @desc    Get all assignments for a workshop
 * @access  Private (Students, Instructors, Admins)
 */
router.get(
  "/workshop/",
  Authorization.verifyToken,
  Authorization.checkRoles(STUDENT_ROLES),
  AssignmentController.getAllAssignments
);

/**
 * @route   GET /api/assignments/:id
 * @desc    Get assignment by ID
 * @access  Private (Students, Instructors, Admins)
 */
router.get(
  "/:id",
  Authorization.verifyToken,
  Authorization.checkRoles(STUDENT_ROLES),
  AssignmentController.getAssignmentById
);

/**
 * @route   PUT /api/assignments/:id
 * @desc    Update assignment by ID
 * @access  Private (Admin roles only)
 */
router.put(
  "/:id",
  Authorization.verifyToken,
  Authorization.checkRoles(ADMIN_AUTHORITY),
  AssignmentController.updateAssignment
);

/**
 * @route   DELETE /api/assignments/:id
 * @desc    Delete assignment by ID
 * @access  Private (Admin roles only)
 */
router.delete(
  "/:id",
  Authorization.verifyToken,
  Authorization.checkRoles(ADMIN_AUTHORITY),
  AssignmentController.deleteAssignment
);

module.exports = router;
