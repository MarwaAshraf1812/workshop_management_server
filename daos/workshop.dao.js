const prisma = require("../config/prisma");

class WorkshopDAO {
  async createWorkshop(workshopData) {
    try {
      workshopData.start_date = new Date(workshopData.start_date).toISOString();
      workshopData.end_date = new Date(workshopData.end_date).toISOString();

      const workshop = await prisma.$transaction(async (tx) => {
        return tx.workshop.create({
          data: {
            title: workshopData.title,
            description: workshopData.description,
            start_date: workshopData.start_date,
            end_date: workshopData.end_date,
            online: workshopData.online,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        });
      });
      return workshop;
    } catch (error) {
      throw error;
    }
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
        where: { id: workshopId },
      });

      if (!workshop) return null;

      return tx.workshop.update({
        where: { id: workshopId },
        data: {
          ...workshop,
          ...workshopData,
        },
      });
    });
}

  async deleteWorkshop(workshopId) {
    return await prisma.workshop.delete({
      where: { id: workshopId },
    });
  }

  async getWorkshopUsers(workshopId, page = 1, limit = 10) {
    page = Number(page) || 1; 
    limit = Number(limit) || 10;
    const skip = Math.max(0, (page - 1) * limit);

    return await prisma.workshopUsers.findMany({
      where: { workshop_id: workshopId },
      include: {
        user: {
          include: { profile: true }
        }
      },
      skip: skip,
      take: limit,
      orderBy: { created_at: 'desc' }
    });
  }
  
  async addUserToWorkshop(workshopId, userId) {
    return await prisma.$transaction(async (tx) => {
      const existing = await tx.workshopUsers.findUnique({
        where: {
          workshop_id_user_id: {
            workshop_id: workshopId,
            user_id: userId
          }
        }
      });

      if (existing) return existing;

      return await tx.workshopUsers.create({
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
    return await prisma.workshopUsers.findMany({
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

module.exports = new  WorkshopDAO();