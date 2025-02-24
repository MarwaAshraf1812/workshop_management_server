
const express = require("express");
const MaterialController = require('../controllers/material.controller');
const upload = require('../middlewares/fileUpload');
const Authorization = require('../middlewares/Auth.middleware');
const router = express.Router();

// Routes
router.post("/upload", upload.single('file'), MaterialController.uploadMaterial);
router.get("/workshop/:workshopId", MaterialController.getMaterialsByWorkshopId);
router.delete("/:id", MaterialController.deleteMaterial);

module.exports = router;