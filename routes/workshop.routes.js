const express = require('express');
const WorkshopController = require('../controllers/workshop.controller');
const { Authorization, ROLES } = require('../middlewares/Auth.middleware');
const validateUUIDMiddleware = require('../middlewares/validateUUID.middleware');
const router = express.Router();

const ADMIN_AUTHORITY = [ROLES.ADMIN, ROLES.MODERATOR, ROLES.INSTRUCTOR];
const STUDENT_ROLES = [
  ROLES.STUDENT,
  ROLES.USER,
  ROLES.INSTRUCTOR,
  ROLES.MODERATOR,
  ROLES.ADMIN,
];

// ✅ Workshop management
router
  .route('/')
  .post(
    Authorization.verifyToken,
    Authorization.checkRoles(ADMIN_AUTHORITY),
    WorkshopController.createWorkshop
  )
  .get(
    Authorization.verifyToken,
    Authorization.checkRoles(STUDENT_ROLES),
    WorkshopController.getAllWorkshops);

  router
  .route('/:id')
  .all(validateUUIDMiddleware)
  .get(
    Authorization.verifyToken,
    Authorization.checkRoles(STUDENT_ROLES),
    WorkshopController.getWorkshopById)
  .put(
    Authorization.verifyToken,
    Authorization.checkRoles(['ADMIN']),
    WorkshopController.updateWorkshop
  )
  .delete(
    Authorization.verifyToken,
    Authorization.checkRoles(['ADMIN']),
    WorkshopController.deleteWorkshop
  );

// ✅ Workshop user management
router
  .route('/:id/users')
  .all(validateUUIDMiddleware)
  .post(
    Authorization.verifyToken,
    Authorization.checkRoles(STUDENT_ROLES),
    WorkshopController.addUserToWorkshop
  )
  .get(
    Authorization.verifyToken,
    Authorization.checkRoles(ADMIN_AUTHORITY),
    WorkshopController.getWorkshopUsers
  );

router.delete(
  '/:id/users/',
  Authorization.verifyToken,
  Authorization.checkRoles(['MODERATOR', 'ADMIN']),
  validateUUIDMiddleware,
  WorkshopController.removeUserFromWorkshop
);

router.get(
  '/:id/users/',
  Authorization.verifyToken,
  Authorization.checkRoles(STUDENT_ROLES),
  validateUUIDMiddleware,
  WorkshopController.getWorkshopUsers
);

module.exports = router;