const express = require("express");
const quizController = require("../controllers/quiz.controller");
const { Authorization } = require("../middlewares/Auth.middleware");
const { ADMIN_AUTHORITY, STUDENT_ROLES } = require("../constants/roles");

const router = express.Router();

/**
 * @route   POST /api/quiz
 * @desc    Create a new quiz
 * @access  Private (Instructors, Moderators, Admins)
 */
router.post(
  "/",
  Authorization.verifyToken,
  Authorization.checkRoles(ADMIN_AUTHORITY),
  quizController.createQuiz
);

/**
 * @route   GET /api/quiz/:id
 * @desc    Get a quiz by id
 * @access  Private (Students, Instructors, Moderators, Admins)
 */
router.get(
  "/:id",
  Authorization.verifyToken,
  Authorization.checkRoles(STUDENT_ROLES),
  quizController.getQuizById
);

/**
 * @route   GET /api/quiz/workshop/:workshop_id
 * @desc    Get all quizzes for a workshop
 * @access  Private (Students, Instructors, Moderators, Admins)
 */
router.get(
  "/workshop/:workshop_id",
  Authorization.verifyToken,
  Authorization.checkRoles(STUDENT_ROLES),
  quizController.getWorkshopQuizzes
);

/**
 * @route   DELETE /api/quiz/:id
 * @desc    Delete a quiz by id
 * @access  Private (Instructors, Moderators, Admins)
 */
router.delete(
  "/:id",
  Authorization.verifyToken,
  Authorization.checkRoles(ADMIN_AUTHORITY),
  quizController.deleteQuiz
);

module.exports = router;
