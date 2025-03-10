const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quiz.controller");
const { Authorization, ROLES } = require("../middlewares/Auth.middleware");

const ASSIGNMENT_ROLES = [ROLES.ADMIN, ROLES.MODERATOR, ROLES.INSTRUCTOR];
const STUDENT_ROLES = [
  ROLES.STUDENT,
  ROLES.USER,
  ROLES.INSTRUCTOR,
  ROLES.MODERATOR,
  ROLES.ADMIN,
];


/**
 * @route   POST /api/auiz
 * @desc    Create a new quiz
 * @access  Private (Instructors, Moderators, Admins)
 */
router.post(
  "/",
  Authorization.verifyToken,
  Authorization.checkRoles(ASSIGNMENT_ROLES),
  quizController.createQuiz
);


/**
 * @route   GET /api/quiz/:id
 * @desc    Get a quiz by id
 * @access  Private (Instructors, Moderators, Admins)
 */
router.get(
  "/:id",
  Authorization.verifyToken,
  Authorization.checkRoles(STUDENT_ROLES),
  quizController.getQuizById
);

/**
 * @route   GET /api/quiz/workshop/:workshop_id
 * @desc    Get all quizes for a workshop
 * @access  Private (Instructors, Moderators, Admins)
 * @query   page, limit
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
  Authorization.checkRoles(ASSIGNMENT_ROLES),
  quizController.deleteQuiz
);

module.exports = router;