const express = require('express');
const WorkshopController = require('../controllers/workshop.controller');
const {adminAuthorization, instructorAuthorization, moderatorAuthorization} = require('../middlewares/Auth.middleware');
const validateUUIDMiddleware = require('../middlewares/validateUUID.middleware');

const router = express.Router();

// ✅ Workshop management
router
  .route('/')
  .post(adminAuthorization, WorkshopController.createWorkshop)
  .get(adminAuthorization, moderatorAuthorization, instructorAuthorization, WorkshopController.getAllWorkshops);

router
  .route('/:id')
  .all(validateUUIDMiddleware)
  .get(instructorAuthorization,  WorkshopController.getWorkshopById)
  .put(adminAuthorization, moderatorAuthorization, instructorAuthorization, WorkshopController.updateWorkshop)
  .delete(adminAuthorization, moderatorAuthorization, WorkshopController.deleteWorkshop);

// ✅ Workshop user management
router
  .route('/:id/users')
  .all(adminAuthorization, validateUUIDMiddleware)
  .post(WorkshopController.addUserToWorkshop)
  .get(WorkshopController.getWorkshopUsers);

router.delete(
  '/:id/users/:userId',
  adminAuthorization,
  validateUUIDMiddleware,
  WorkshopController.removeUserFromWorkshop
);

module.exports = router;
