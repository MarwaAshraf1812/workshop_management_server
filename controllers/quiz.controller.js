const QuizService = require("../services/quiz.service");
const { validateQuiz } = require("../validations/quiz.validation");
const { ValidationError, NotFoundError, DatabaseError } = require("../utils/errors");

class QuizController {
  static async createQuiz(req, res) {
    try {
      const { error } = validateQuiz(req.body);
      if (error) {
        return res.status(400).json({ 
          success: false, 
          error: "Validation failed",
          details: error.details 
        });
      }

      const quiz = await QuizService.createQuiz(req.body);
      res.status(201).json({ success: true, data: quiz });
    } catch (error) {
      console.error("Error creating quiz in controller:", error);
      
      if (error instanceof ValidationError) {
        return res.status(400).json({ success: false, error: error.message });
      }
      
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }


  static async getQuizById(req, res) {
    try {
      const quiz = await QuizService.getQuizById(req.params.id);
      res.status(200).json({ success: true, data: quiz });
    } catch (error) {
      console.error("Error getting quiz by id in controller:", error);
      
      if (error instanceof NotFoundError) {
        return res.status(404).json({ success: false, error: error.message });
      }
      
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }

  static async getWorkshopQuizzes(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      
      const result = await QuizService.getWorkshopQuizzes(
        req.params.workshop_id, 
        { page, pageSize }
      );
      
      res.status(200).json({ 
        success: true, 
        data: result.quizzes,
        pagination: result.pagination
      });
    } catch (error) {
      console.error("Error getting workshop quizzes in controller:", error);
      
      if (error instanceof NotFoundError) {
        return res.status(404).json({ success: false, error: error.message });
      }
      
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }

  static async deleteQuiz(req, res) {
    try {
      await QuizService.deleteQuiz(req.params.id);
      res.status(200).json({ success: true, message: "Quiz deleted" });
    } catch (error) {
      console.error("Error deleting quiz in controller:", error);
      
      if (error instanceof NotFoundError) {
        return res.status(404).json({ success: false, error: error.message });
      }
      
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }

}

module.exports = QuizController;