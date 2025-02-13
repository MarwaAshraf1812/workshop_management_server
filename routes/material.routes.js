
const express = require("express");
// const multer = require("multer");
const MaterialController = require('../controllers/material.controller');

const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/materials/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// Routes
router.post("/upload", MaterialController.uploadMaterial);
router.get("/workshop/:workshopId", MaterialController.getMaterialsByWorkshopId);
router.delete("/:id", MaterialController.deleteMaterial);

module.exports = router;
