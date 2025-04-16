const express = require("express");
const MaterialController = require("../controllers/material.controller");
const upload = require("../middlewares/fileUpload");
const { Authorization } = require("../middlewares/Auth.middleware");
const { MATERIAL_ROLES } = require("../utils/UserRole");

const router = express.Router();

/**
 * @route   POST /api/workshop/material/upload
 * @desc    Upload material to a workshop
 * @access  Private (Instructor, Moderator, Admin roles)
 */
router.post(
  "/upload",
  Authorization.verifyToken,
  Authorization.checkRoles(MATERIAL_ROLES),
  upload.single("file"),
  MaterialController.uploadMaterial
);

/**
 * @route   GET /api/workshop/material/:workshopId
 * @desc    Get materials of a workshop
 * @access  Private (Instructor, Moderator, Admin roles)
 */
router.get(
  "/:workshopId",
  Authorization.verifyToken,
  Authorization.checkRoles(MATERIAL_ROLES),
  MaterialController.getMaterialsByWorkshopId
);

/**
 * @route   DELETE /api/workshop/material/:materialId
 * @desc    Delete material by ID
 * @access  Private (Instructor, Moderator, Admin roles)
 */
router.delete(
  "/:materialId",
  Authorization.verifyToken,
  Authorization.checkRoles(MATERIAL_ROLES),
  MaterialController.deleteMaterial
);

module.exports = router;
