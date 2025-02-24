const NotificationDAO = require("../daos/notification.dao");
const io = require('../app').io;

class NotificationService {
  async sendNotification({ userId, message, type }) {
    try {
      const notification = await NotificationDAO.createNotification({ userId, message, type });

      if (userId) {
        io.to(`user:${userId}`).emit("notification", {
          id: notification.id,
          message,
          type
        });
      }
      return notification;
    } catch (error) {
      console.error("Error in sendNotification:", error);
      throw error;
    }
  }

  async sendNotificationToAll({ message, type }) {
    try {
      const notification = await NotificationDAO.createNotificationForAllUsers({ message, type });

      io.emit("notification", {
        id: notification.id,
        message,
        type,
      });

      return notification;
    } catch (error) {
      console.error("Error in sendNotificationToAll:", error);
      throw error;
    }
  }

  async getNotifications(userId, options = { page: 1, limit: 10 }) {
    try {
      return await NotificationDAO.getNotifications(userId, options);
    } catch (error) {
      console.error("Error in getNotifications:", error);
      throw error;
      
    }
  }

  async markAsRead(notificationId, userId) {
    try {
      const notification = await NotificationDAO.markAsRead(notificationId, userId);

      io.to(`user:${userId}`).emit("notification:read", {
        id: notificationId
      });

      return notification;
    } catch (error) {
      console.error("Error in markAsRead:", error);
      throw error;
    }
  }

  async markAllAsRead(userId) {
    try {
      await NotificationDAO.markAllAsRead(userId);

      io.to(`user:${userId}`).emit("notification:read:all");

      return { message: "All notifications marked as read" };
    } catch (error) {
      console.error("Error in markAllAsRead:", error);
      throw error;
    }
  }
}

module.exports = new NotificationService();