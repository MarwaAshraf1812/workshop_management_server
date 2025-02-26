const prisma = require("../config/prisma");

class NotificationDAO {
  async createNotification({ userId, message, type }) {
    try {
      return await prisma.notification.create({
        data: {
          message,
          type,
          created_at: new Date(),
          userNotifications: {
            create: userId
              ? { user: { connect: { id: userId } } }
              : undefined,
          },
        }
      });
    } catch (error) {
      console.error("Error in createNotification:", error);
      throw error;
    }
  }
  
  async createNotificationForAllUsers({ message, type }) {
    try {
        const notification = await prisma.notification.create({
            data: {
                message,
                type,
                created_at: new Date()
            }
        });

        const users = await prisma.user.findMany({
            select: {
                id: true
            }
        });

        const userNotifications = users.map(user => ({
            user_id: user.id,
            notification_id: notification.id
        }));

        await prisma.userNotification.createMany({
            data: userNotifications
        });

        return {
            notification,
            totalUsers: users.length
        };
    } catch (error) {
        console.error("Error in createNotificationForAllUsers:", error);
        throw error;
    }
}


  async getNotifications(userId, { page = 1, limit = 10 } = {}) {
    try {
        const pageNumber = Number(page) || 1;
        const limitNumber = Number(limit) || 10;
        const skip = (pageNumber - 1) * limitNumber;

        return await prisma.userNotification.findMany({
            where: {
                user_id: userId,
            },
            orderBy: {
                notification: {
                    created_at: "desc"
                }
            },
            skip: skip,
            take: limitNumber,
            select: {
                read: true,
                notification: {
                    select: {
                        id: true,
                        message: true,
                        type: true,
                        created_at: true
                    }
                }
            }
        });

    } catch (error) {
        console.error("Error in getNotifications:", error);
        throw new Error("Failed to fetch notifications");
    }
}


  async markAsRead(notificationId, userId) {
    try {
        const updatedUserNotification = await prisma.userNotification.updateMany({
            where: {
                notification_id: notificationId,
                user_id: userId
            },
            data: {
                read: true,
                updated_at: new Date()
            }
        });

        if (updatedUserNotification.count === 0) {
            console.log("No user notification updated - might not exist for this user.");
            return null;
        }

        return updatedUserNotification;
    } catch (error) {
        console.error("Error in markAsRead:", error);
        throw error;
    }
}

  async markAllAsRead(userId) {
    try {
      return await prisma.userNotification.updateMany({
        where: {
          user_id: userId,
          read: false
        },
        data: {
          read: true,
          updated_at: new Date()
        }
      })
    } catch (error) {
      console.error("Error in markAllAsRead:", error);
      throw error;
    }
  }
}

module.exports = new NotificationDAO();