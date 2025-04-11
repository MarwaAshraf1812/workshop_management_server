const express = require("express");
const ProgressController = require("../controllers/Progress.controller");
const { Authorization, ROLES } = require("../middlewares/Auth.middleware");
const ADMIN_AUTHORITY = [ROLES.ADMIN, ROLES.MODERATOR, ROLES.INSTRUCTOR];
const STUDENT_ROLES = [
  ROLES.STUDENT,
  ROLES.USER,
  ROLES.INSTRUCTOR,
  ROLES.MODERATOR,
  ROLES.ADMIN,
];
const router = express.Router();

router.route("/:student_id/:workshop_id")
  .get(
    Authorization.verifyToken,
    Authorization.checkRoles(STUDENT_ROLES),
    ProgressController.getProgress
  )
  .post(
    Authorization.verifyToken,
    Authorization.checkRoles(ADMIN_AUTHORITY),
    ProgressController.create
  )
router.route("/:progress_id")
  .delete(
    Authorization.verifyToken,
    Authorization.checkRoles(ADMIN_AUTHORITY),
    ProgressController.delete
  );

router.route("/attendance/:student_id/:workshop_id")
  .put(
    Authorization.verifyToken,
    Authorization.checkRoles(ADMIN_AUTHORITY),
    ProgressController.attend
  );

router.route("/assignment_grade/:student_id/:workshop_id")
  .put(
    Authorization.verifyToken,
    Authorization.checkRoles(ADMIN_AUTHORITY),
    ProgressController.addAssignmentGrade
  );

router.route("/quiz_grade/:student_id/:workshop_id")
  .put(
    Authorization.verifyToken,
    Authorization.checkRoles(ADMIN_AUTHORITY),
    ProgressController.addQuizGrade
  );

module.exports = router;