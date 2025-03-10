const QuizDAO = require("../daos/quiz.dao");
const QuizDTO = require("../dtos/quiz.dto");
const { ValidationError, NotFoundError } = require("../utils/errors");

class QuizService {
  static async createQuiz(quizData) {
    try {
      const quiz = await QuizDAO.createQuiz(quizData);
      return QuizDTO.fromDatabase(quiz);
    } catch (error) {
      throw new ValidationError(error.message);
    }
  }

  static async getQuizById(id) {
    try {
      const quiz = await QuizDAO.getQuizById(id);
      if (!quiz) {
        throw new NotFoundError("Quiz not found");
      }
      return QuizDTO.fromDatabase(quiz);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError("Error retrieving quiz: " + error.message);
    }
  }

  static async getWorkshopQuizzes(workshop_id, options = { page: 1, pageSize: 10 }) {
    try {
      const quizzes = await QuizDAO.getWorkshopQuizzes(workshop_id, options);
      const totalCount = await QuizDAO.countWorkshopQuizzes(workshop_id);
      
      return {
        quizzes: quizzes.map(quiz => QuizDTO.fromDatabase(quiz)),
        pagination: {
          page: options.page,
          pageSize: options.pageSize,
          totalCount,
          totalPages: Math.ceil(totalCount / options.pageSize)
        }
      };
    } catch (error) {
      throw new DatabaseError("Error retrieving quizzes: " + error.message);
    }
  }

  static async deleteQuiz(id) {
    try {
      const existingQuiz = await QuizDAO.getQuizById(id);
      if (!existingQuiz) {
        throw new NotFoundError("Quiz not found");
      }
      const quiz = await QuizDAO.deleteQuiz(id);
      return QuizDTO.fromDatabase(quiz);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new ValidationError(error.message);
    }
  }
}

module.exports = QuizService;