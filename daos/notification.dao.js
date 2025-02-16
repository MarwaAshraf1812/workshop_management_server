const prisma = require("../config/prisma");

class NotificationDAO {
  async createNotification({ userId, message, type = 'DEFAULT' }) {
    try {
      return await prisma.notification.create({
        data: {
          userId,
          message,
          type,
          read: false,
          createdAt: new Date()
        }
      });
    } catch (error) {
      console.error("Error in createNotification:", error);
      throw error;
    }
  }

  async createNotificationForAllUsers({ message, type }) {
    try {
      return await prisma.notification.create({
        data: {
          message,
          type,
          read: false,
          createdAt: new Date()
        }
      })
    } catch (error) {
      console.error("Error in createNotificationForAllUsers:", error);
      throw error;
    }
  }

  async getNotifications(userId, {page = 1, limit = 10}) {
    try {
      const skip = (page - 1) * limit;
      return await prisma.notification.findMany({
        where: {
          OR: [{ userId }, { userId: null }]
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit,
        select: {
          id: true,
          message: true,
          type: true,
          read: true,
          createdAt: true
        }
      })
    } catch (error) {
      console.error("Error in getNotifications:", error);
      throw error;
    }
  }

  async markAsRead(notificationId, userId) {
    try {
      return await prisma.notification.update({
        where: {
          id: notificationId,
          OR: [{ userId }, { userId: null }]
        },
        data: {
          read: true,
          updatedAt: new Date()
        }
      })
    } catch (error) {
      console.error("Error in MarkAsRead:", error);
      throw error;
    }
  }

  async markAllAsRead(userId) {
    try {
      return await prisma.notification.updateMany({
        where: {
          userId,
          read: false
        },
        data: {
          read: true,
          updatedAt: new Date()
        }
      })
    } catch (error) {
      console.error("Error in markAllAsRead:", error);
      throw error;
    }
  }
}

module.exports = new NotificationDAO();