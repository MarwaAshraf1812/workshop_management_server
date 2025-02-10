const express = require('express');
const WorkshopController = require('../controllers/workshop.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const validateUUIDMiddleware = require('../middlewares/validateUUID.middleware');

const router = express.Router();

// ✅ Workshop management
router
  .route('/')
  .post(authMiddleware, WorkshopController.createWorkshop)
  .get(WorkshopController.getAllWorkshops);

router
  .route('/:id')
  .all(validateUUIDMiddleware)
  .get(WorkshopController.getWorkshopById)
  .put(authMiddleware, WorkshopController.updateWorkshop)
  .delete(authMiddleware, WorkshopController.deleteWorkshop);

// ✅ Workshop user management
router
  .route('/:id/users')
  .all(authMiddleware, validateUUIDMiddleware)
  .post(WorkshopController.addUserToWorkshop)
  .get(WorkshopController.getWorkshopUsers);

router.delete(
  '/:id/users/:userId',
  authMiddleware,
  validateUUIDMiddleware,
  WorkshopController.removeUserFromWorkshop
);

module.exports = router;
