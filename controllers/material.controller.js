const MaterialService =  require("../services/material.service");

class MaterialController {
  async uploadMaterial(req, res) {
    try {
      const { title, workshop_id, material_type } = req.body;
      const file_url = req.file.path; // Handled by multer

      const material = await MaterialService.uploadMaterial({ title, workshop_id, material_type, file_url });
      res.status(201).json({ success: true, material });
    } catch (error) {
      console.error("Error uploading material:", error);
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async getMaterialsByWorkshopId(req, res) {
    try {
      const { workshopId } = req.params;
      const materials = await MaterialService.getMaterialsByWorkshop(workshopId);
      res.status(200).json({ success: true, materials });
    } catch (error) {
      console.error("Error getting materials by workshop:", error);
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async deleteMaterial(req, res) {
    try {
      const { material_id } = req.params;
      await MaterialService.deleteMaterial(material_id);
      res.status(200).json({ success: true, message: "Material deleted successfully" });
    } catch (error) {
      console.error("Error deleting material:", error);
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new MaterialController();