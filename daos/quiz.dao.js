const prisma = require("../config/prisma");

class QuizDAO {
  static async createQuiz(quiz) {
    try {
      return await prisma.quiz.create({
        data: quiz,
        include: {
          workshop: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      })
    } catch (error) {
      console.error("Error creating quiz:", error);
      throw error;
    }
  }

  static async getQuizById(id) {
    try {
      return await prisma.quiz.findUnique({
        where: { id: id },
        include: { workshop: true },
      });
    } catch (error) {
      console.error("Error getting quiz by id:", error);
      throw error;
    }
  }

  static async countWorkshopQuizzes(workshop_id) {
    try {
      return await prisma.quiz.count({
        where: { workshop_id: workshop_id }
      });
    } catch (error) {
      console.error("Error counting workshop quizzes:", error);
      throw error;
    }
  }

  static async getWorkshopQuizzes(workshop_id, options = { page: 1, pageSize: 10 }) {
    try {
      const skip = (options.page - 1) * options.pageSize;
      
      return await prisma.quiz.findMany({
        where: { workshop_id: workshop_id },
        include: { workshop: true },
        skip: skip,
        take: options.pageSize,
        orderBy: { created_at: 'desc' }, 
      });
    } catch (error) {
      console.error("Error getting workshop quizzes:", error);
      throw error;
    }
  }

  static async deleteQuiz(id) {
    try {
      return await prisma.quiz.delete({
        where: { id: id },
      });

    } catch (error) {
      console.error("Error deleting quiz:", error);
      throw error;
    }
  }
}

module.exports = QuizDAO;