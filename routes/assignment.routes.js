const express = require('express');
const router = express.Router();
const AssignmentController = require('../controllers/assignment.controller');
const { Authorization, ROLES } = require('../middlewares/Auth.middleware');

const ASSIGNMENT_ROLES = [
  ROLES.ADMIN,
  ROLES.MODERATOR,
  ROLES.INSTRUCTOR,
]

const STUDENT_ROLES = [
  ROLES.STUDENT,
  ROLES.USER,
  ROLES.INSTRUCTOR,
  ROLES.MODERATOR,
  ROLES.ADMIN
];

/**
 * @route   POST /api/assignments
 * @desc    Create a new assignment
 * @access  Private (Instructors, Moderators, Admins)
 */
router.post(
  '/',
  Authorization.verifyToken,
  Authorization.checkRoles(ASSIGNMENT_ROLES),
  AssignmentController.addNewAssignment
)

/**
 * @route   GET /api/assignments/:id
 * @desc    Get assignment by ID
 * @access  Private (Students, Instructors, Moderators, Admins)
 */
router.get(
  '/:id',
  Authorization.verifyToken,
  Authorization.checkRoles(STUDENT_ROLES),
  AssignmentController.getAssignmentById
)

/**
 * @route   PUT /api/assignments/:id
 * @desc    Update assignment by ID
 * @access  Private (Instructors, Moderators, Admins)
 */
router.put(
  '/:id',
  Authorization.verifyToken,
  Authorization.checkRoles(ASSIGNMENT_ROLES),
  AssignmentController.updateAssignment
)

/**
 * @route   DELETE /api/assignments/:id
 * @desc    Delete assignment by ID
 * @access  Private (Instructors, Moderators, Admins)
 */
router.delete(
  '/:id',
  Authorization.verifyToken,
  Authorization.checkRoles(ASSIGNMENT_ROLES),
  AssignmentController.deleteAssignment
)

/**
 * @route   GET /api/assignments/workshop/:id
 * @desc    Get all assignments for a workshop
 * @access  Private (Students, Instructors, Moderators, Admins)
 */
router.get(
  '/workshop/:id',
  Authorization.verifyToken,
  Authorization.checkRoles(STUDENT_ROLES),
  AssignmentController.getAllAssignments
)

module.exports = router;