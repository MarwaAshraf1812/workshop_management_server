const express = require("express");
const NotificationController = require("../controllers/notification.controller");
const { Authorization } = require("../middlewares/Auth.middleware");
const router = express.Router();

router.post(
  "/notify",
  Authorization.checkRoles(["INSTRUCTOR", "MODERATOR", "ADMIN"]),
  NotificationController.sendNotification
);
router.post(
  "/notify/all",
  Authorization.checkRoles(["INSTRUCTOR", "MODERATOR", "ADMIN"]),
  NotificationController.sendNotificationToAll
);
router.get(
  "/",
  Authorization.checkRoles(["INSTRUCTOR", "MODERATOR", "ADMIN", "STUDENT"]),
  NotificationController.getNotifications
);
router.put(
  "/read/:notificationId",
  Authorization.checkRoles(["INSTRUCTOR", "MODERATOR", "ADMIN", "STUDENT"]),
  NotificationController.markAsRead
);
router.put(
  "/read-all",
  Authorization.checkRoles(["INSTRUCTOR", "MODERATOR", "ADMIN", "STUDENT"]),
  NotificationController.markAllAsRead
);

module.exports = router;
