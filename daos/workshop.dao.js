import prisma from "../config/prisma";

class WorkshopDAO {
  async createWorkshop(workshopData) {
    return await prisma.$transaction(async (tx) => {
      return tx.workshop.create({ data: workshopData });
    });
  }

  async getAllWorkshops(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [workshops, total] = await prisma.$transaction([
      prisma.workshop.findMany({
        include: { 
          Materials: true, 
          quizzes: true, 
          assignments: true, 
        },
        skip,
        take: limit,
        orderBy: { created_at: 'desc' }
      }),
      prisma.workshop.count()
    ]);

    return { workshops, total, page, limit };
  }

  async getWorkshopById(workshopId) {
    return await prisma.workshop.findUnique({
      where: { id: workshopId },
      include: {
        Materials: true,
        quizzes: true,
        assignments: true,
        progress: true,
        workshop_users: {
          include: {
            user: {
              include: { profile: true }
            }
          }
        }
      }
    });
  }

  async updateWorkshop(workshopId, workshopData) {
    return await prisma.$transaction(async (tx) => {
      const workshop = await tx.workshop.findUnique({
        where: { id: workshopId }
      });

      if (!workshop) return null;

      return tx.workshop.update({
        where: { id: workshopId },
        data: workshopData
      });
    });
  }

  async getWorkshopUsers(workshopId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await prisma.workshop_users.findMany({
      where: { workshop_id: workshopId },
      include: {
        user: {
          include: { profile: true }
        }
      },
      skip,
      take: limit,
      orderBy: { created_at: 'desc' }
    });
  }

  async addUserToWorkshop(workshopId, userId) {
    return await prisma.$transaction(async (tx) => {
      const existing = await tx.workshop_users.findUnique({
        where: {
          workshop_id_user_id: {
            workshop_id: workshopId,
            user_id: userId
          }
        }
      });

      if (existing) return null;

      return tx.workshop_users.create({
        data: {
          workshop_id: workshopId,
          user_id: userId
        },
        include: {
          user: {
            include: { profile: true }
          }
        }
      });
    });
  }

  async getUserWorkshops(userId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await prisma.workshop_users.findMany({
      where: { user_id: userId },
      include: {
        workshop: {
          include: {
            Materials: true,
            quizzes: true,
            assignments: true
          }
        }
      },
      skip,
      take: limit,
      orderBy: { created_at: 'desc' }
    });
  }
}

module.exports = WorkshopDAO;