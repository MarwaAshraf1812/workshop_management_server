const MaterialService =  require("../services/material.service");

class MaterialController {
  async uploadMaterial(req, res) {
    try {
      if (req.user.role !== 'ADMIN' && req.user.role !== 'MODERATOR') {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to remove users from this workshop"
        });
      }
      const { title, workshop_id, material_type, file_url } = req.body;
  
      let finalFileUrl = file_url;
  
      if (req.file) {
        finalFileUrl = req.file.path;
      }

      if (!finalFileUrl) {
        return res.status(400).json({
          success: false,
          message: "Either a file or a link must be provided"
        });
      }
  
      const material = await MaterialService.uploadMaterial({
        title,
        workshop_id,
        material_type,
        file_url: finalFileUrl
      });
  
      res.status(201).json({ success: true, material });
  
    } catch (error) {
      console.error("Error uploading material:", error);
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }
  

  async getMaterialsByWorkshopId(req, res) {
    try {
      const { workshopId } = req.params;

      if (!workshopId) {
        return res.status(400).json({ error: "Workshop ID is missing" });
      }
      const materials = await MaterialService.getMaterialsByWorkshopId(workshopId);
      res.status(200).json({ success: true, materials });
    } catch (error) {
      console.error("Error getting materials by workshop:", error);
      res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }
  

  async deleteMaterial(req, res) {
    try {
      if (req.user.role !== 'ADMIN' && req.user.role !== 'MODERATOR') {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to remove users from this workshop"
        });
      }
      const { materialId } = req.params;
      if (!materialId) {
        return res.status(400).json({ error: "Material ID is required" });
      }
      const deleted = await MaterialService.deleteMaterial(materialId);
      res.status(200).json(deleted);
    } catch (error) {
      console.error("Error in deleteMaterial:", error);
      res.status(500).json({ success: false, message: "Failed to delete material" });
    }
  }
  
}

module.exports = new MaterialController();