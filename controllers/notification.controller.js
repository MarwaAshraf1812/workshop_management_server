const NotificationService = require("../services/notification.service");
const NotificationValidator = require("../validations/notification.validator");

class NotificationController {

  async sendNotification(req, res) {
    try {
      const { error, value } = NotificationValidator.validateNotification(req.body);

      if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
      }

      const notification = await NotificationService.sendNotification(value);
      res.status(201).json({ success: true, notification });
    } catch (error) {
      console.error("Error in sendNotification:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }


  async sendNotificationToAll(req, res) {
    try {
      const { message, type } = req.body;
      

      if (!message) {
        return res.status(400).json({ 
          success: false, 
          message: "Message is required" 
        });
      }

      const notification = await NotificationService.sendNotificationToAll({ message, type });
      res.status(201).json({ success: true, notification });
    } catch (error) {
      console.error("Error in sendNotificationToAll:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getNotifications(req, res) {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ success: false, message: "Unauthorized access" });
      }
  
      const userId = req.user.id;
      const { page, limit } = req.query;
      const notifications = await NotificationService.getNotifications(userId
        ,
        { page: parseInt(page), limit: parseInt(limit) }
      );

      res.status(200).json({ success: true, notifications });
    } catch (error) {
      console.error("Error in getNotifications:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async markAsRead(req, res) {
    try {
      const { notificationId } = req.params;
      const userId = req.user?.id;
      console.log("userId", req.user);

      if (!notificationId) {
        return res.status(400).json({ 
          success: false, 
          message: "Notification ID is required" 
        });
      }

      if (!userId) {
        return res.status(401).json({ 
          success: false, 
          message: "Unauthorized access" 
        });
      }

      const notification = await NotificationService.markAsRead(notificationId, userId);
      if (!notification) {
        return res.status(404).json({ success: false, message: "Notification not found" });
      }

      res.status(200).json({ success: true, message: "Notification marked as read" });
    } catch (error) {
      console.error("Error in markAsRead:", error);
      res.status(500).json({ message: "Internal server error" });
    }
}


  async markAllAsRead(req, res) {
    try {
      const userId = req.user.id;
      await NotificationService.markAllAsRead(userId);
      
      res.status(200).json({ 
        success: true, 
        message: "All notifications marked as read" 
      });
    } catch (error) {
      console.error("Error in markAllAsRead:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to mark all notifications as read" 
      });
    }
  }
}

module.exports = new NotificationController();