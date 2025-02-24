const express = require("express");
const MaterialController = require("../controllers/material.controller");
const upload = require("../middlewares/fileUpload");
const { Authorization, ROLES } = require("../middlewares/Auth.middleware");
const router = express.Router();

router.post(
  "/upload",  
  Authorization.checkRoles(["INSTRUCTOR", "MODERATOR", "ADMIN"]),
  upload.single("file"),
  MaterialController.uploadMaterial
);

router.get(
  "/:workshopId",
  Authorization.checkRoles(["INSTRUCTOR", "MODERATOR", "ADMIN"]),
  MaterialController.getMaterialsByWorkshopId
);

router.delete(
  "/:materialId",
  Authorization.checkRoles(["INSTRUCTOR", "MODERATOR", "ADMIN"]),
  MaterialController.deleteMaterial
);

module.exports = router;