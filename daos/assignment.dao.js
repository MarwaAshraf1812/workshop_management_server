const prisma = require("../config/prisma");
const { message } = require("../validations/assignment.validation");

class AssignmentDAO {
  static async createAssignment(assignment) {
    try {
      const workshop = await prisma.workshop.findUnique({
        where: { id: assignment.workshop_id }
      });
  
      if (!workshop) {
        throw new Error("Workshop not found");
      }
  
      return await prisma.assignment.create({
        data: {
          title: assignment.title,
          description: assignment.description,
          deadline: assignment.deadline,
          workshop_id: assignment.workshop_id,
          total_points: assignment.total_points,
          assignment_link: assignment.assignment_link
        }
      });
    } catch (error) {
      console.error("Error creating assignment:", error);
      throw error;
    }
  }
  

  static async getAssignmentById(id) {
    try {
      const assignment = await prisma.assignment.findUnique({
        where: { id: id },
        include: {
          workshop: {
            select: {
              id: true,
              title: true, 
            },
          },
        },
      });
  
      console.log(assignment);
      return assignment
    } catch (error) {
      console.error("Error getting assignment by id:", error);
      throw error;
    }
  }
  

  static async getAssignmentsByWorkshopId(workshop_id, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      
      const [assignments, total] = await Promise.all([
        prisma.assignment.findMany({
          where: {
            workshop_id: workshop_id,
          },
          include: {
            workshop: {
              select: {
                id: true,
                title: true,
              },
            },
          },
          skip,
          take: limit,
          orderBy: {
            deadline: 'asc'
          }
        }),
        prisma.assignment.count({
          where: {
            workshop_id: workshop_id,
          }
        })
      ]);

      return {
        assignments,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error("Error getting assignments by workshop id:", error);
      throw error;
    }
  }

  static async updateAssignment(id, assignment) {
    try {
      return await prisma.assignment.update({
        where: { id: id },
        data: {
          title: assignment.title,
          description: assignment.description,
          deadline: assignment.deadline,
          workshop_id: assignment.workshop_id,
          total_points: assignment.total_points,
          assignment_link: assignment.assignment_link,
          updated_at: new Date(),
        },
      });
    } catch (error) {
      console.error("Error updating assignment:", error);
      throw error;
    }
  }

  static async deleteAssignment(id) {
    try {
      return await prisma.assignment.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error deleting assignment:", error);
      throw error;
    }
  }
}

module.exports = AssignmentDAO;