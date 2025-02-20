const express = require('express');
const WorkshopController = require('../controllers/workshop.controller');
const { Authorization, ROLES } = require('../middlewares/Auth.middleware');
const validateUUIDMiddleware = require('../middlewares/validateUUID.middleware');
const router = express.Router();

// ✅ Workshop management
router
  .route('/')
  .post(
    Authorization.checkRoles(['INSTRUCTOR', 'MODERATOR', 'ADMIN']),
    WorkshopController.createWorkshop
  )
  .get(WorkshopController.getAllWorkshops);

router
  .route('/:id')
  .all(validateUUIDMiddleware)
  .get(WorkshopController.getWorkshopById)
  .put(
    Authorization.checkRoles(['ADMIN']),
    WorkshopController.updateWorkshop
  )
  .delete(
    Authorization.checkRoles(['ADMIN']),
    WorkshopController.deleteWorkshop
  );

// ✅ Workshop user management
router
  .route('/:id/users')
  .all(validateUUIDMiddleware)
  .post(
    Authorization.checkRoles(['ADMIN', 'INSTRUCTOR', 'MODERATOR', 'STUDENT']),
    WorkshopController.addUserToWorkshop
  )
  .get(
    Authorization.checkRoles(['INSTRUCTOR', 'MODERATOR', 'ADMIN']),
    WorkshopController.getWorkshopUsers
  );

router.delete(
  '/:id/users/',
  Authorization.checkRoles(['INSTRUCTOR', 'MODERATOR', 'ADMIN']),
  validateUUIDMiddleware,
  WorkshopController.removeUserFromWorkshop
);

router.get(
  '/:id/users/',
  Authorization.checkRoles(['ADMIN', 'INSTRUCTOR', 'MODERATOR', 'STUDENT']),
  validateUUIDMiddleware,
  WorkshopController.getWorkshopUsers
);

module.exports = router;