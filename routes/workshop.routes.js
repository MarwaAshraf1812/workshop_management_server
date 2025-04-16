const express = require("express");
const WorkshopController = require("../controllers/workshop.controller");
const { Authorization } = require("../middlewares/Auth.middleware");
const { ROLES, ADMIN_AUTHORITY, STUDENT_ROLES } = require("../utils/UserRole");
const validateUUIDMiddleware = require("../middlewares/validateUUID.middleware");

const router = express.Router();

/**
 * @route   POST /api/workshops
 * @desc    Create a new workshop
 * @access  Private (Admin roles only)
 */
router.post(
  "/",
  Authorization.verifyToken,
  Authorization.checkRoles(ADMIN_AUTHORITY),
  WorkshopController.createWorkshop
);

/**
 * @route   GET /api/workshops
 * @desc    Get all workshops
 * @access  Private (Students, Instructors, Admins)
 */
router.get(
  "/",
  Authorization.verifyToken,
  Authorization.checkRoles(STUDENT_ROLES),
  WorkshopController.getAllWorkshops
);

/**
 * @route   GET /api/workshops/:id
 * @desc    Get workshop by ID
 * @access  Private (Students, Instructors, Admins)
 */
router.get(
  "/:id",
  Authorization.verifyToken,
  Authorization.checkRoles(STUDENT_ROLES),
  WorkshopController.getWorkshopById
);

/**
 * @route   PUT /api/workshops/:id
 * @desc    Update a workshop by ID
 * @access  Private (Admin roles only)
 */
router.put(
  "/:id",
  Authorization.verifyToken,
  Authorization.checkRoles([ROLES.ADMIN]),
  WorkshopController.updateWorkshop
);

/**
 * @route   DELETE /api/workshops/:id
 * @desc    Delete a workshop by ID
 * @access  Private (Admin roles only)
 */
router.delete(
  "/:id",
  Authorization.verifyToken,
  Authorization.checkRoles([ROLES.ADMIN]),
  WorkshopController.deleteWorkshop
);

/**
 * @route   POST /api/workshops/:id/users
 * @desc    Add a user to a workshop
 * @access  Private (Admin roles only)
 */
router.post(
  "/:id/users",
  Authorization.verifyToken,
  Authorization.checkRoles(ADMIN_AUTHORITY),
  WorkshopController.addUserToWorkshop
);

/**
 * @route   GET /api/workshops/:id/users
 * @desc    Get all users of a workshop
 * @access  Private (Admin roles only)
 */
router.get(
  "/:id/users",
  Authorization.verifyToken,
  Authorization.checkRoles(ADMIN_AUTHORITY),
  WorkshopController.getWorkshopUsers
);

/**
 * @route   DELETE /api/workshops/:id/users
 * @desc    Remove a user from a workshop
 * @access  Private (Admin and Moderator roles)
 */
router.delete(
  "/:id/users",
  Authorization.verifyToken,
  Authorization.checkRoles([ROLES.MODERATOR, ROLES.ADMIN]),
  validateUUIDMiddleware,
  WorkshopController.removeUserFromWorkshop
);

module.exports = router;
