const express = require("express");
const NotificationController = require("../controllers/notification.controller");
const {adminAuthorization, instructorAuthorization, moderatorAuthorization} = require('../middlewares/Auth.middleware');

const router = express.Router();

router.use(adminAuthorization, instructorAuthorization, moderatorAuthorization);

router.post("/notify", NotificationController.sendNotification);
router.post("/notify/all", NotificationController.sendNotificationToAll);
router.get("/", NotificationController.getNotifications);
router.put("/read/:notificationId", NotificationController.markAsRead);

router.put("/read-all", NotificationController.markAllAsRead);

module.exports = router;