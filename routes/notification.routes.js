const express = require("express");
const NotificationController = require("../controllers/notification.controller");
const { Authorization } = require("../middlewares/Auth.middleware");
const {  STUDENT_ROLES, ADMIN_AUTHORITY } = require("../utils/UserRole");

const router = express.Router();

/**
 * @route   POST /api/notifications/notify
 * @desc    Send notification to specific users
 * @access  Private (Instructors, Moderators, Admins)
 */
router.post(
  "/notify",
  Authorization.verifyToken,
  Authorization.checkRoles(ADMIN_AUTHORITY),
  NotificationController.sendNotification
);

/**
 * @route   POST /api/notifications/notify/all
 * @desc    Send notification to all users
 * @access  Private (Instructors, Moderators, Admins)
 */
router.post(
  "/notify/all",
  Authorization.verifyToken,
  Authorization.checkRoles(ADMIN_AUTHORITY),
  NotificationController.sendNotificationToAll
);

/**
 * @route   GET /api/notifications
 * @desc    Get user's notifications
 * @access  Private (All roles)
 */
router.get(
  "/",
  Authorization.verifyToken,
  Authorization.checkRoles(STUDENT_ROLES),
  NotificationController.getNotifications
);

/**
 * @route   PUT /api/notifications/read/:notificationId
 * @desc    Mark notification as read
 * @access  Private (All roles)
 */
router.put(
  "/read/:notificationId",
  Authorization.verifyToken,
  Authorization.checkRoles(STUDENT_ROLES),
  NotificationController.markAsRead
);

/**
 * @route   PUT /api/notifications/read-all
 * @desc    Mark all notifications as read
 * @access  Private (All roles)
 */
router.put(
  "/read-all",
  Authorization.verifyToken,
  Authorization.checkRoles(STUDENT_ROLES),
  NotificationController.markAllAsRead
);

module.exports = router;
