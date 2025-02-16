const MaterialDAO = require('../daos/material.dao');
// const NotificationDAO = require("../daos/notification.dao");
const {MaterialValidator, MaterialValidation} = require('../validations/material.validation');
const { MaterialDTO} = require('../dtos/material.dto');

class MaterialService {
  async uploadMaterial(data) {
    try {
      MaterialValidator.validate(data);
      const material = await MaterialDAO.uploadMaterial({ MaterialData: data });

      // await NotificationDAO.createNotification({
      //   message: `Material ${material.name} uploaded successfully`,
      // })
      return MaterialDTO.fromDatabase(material);
    } catch (error) {
      if (error instanceof MaterialValidation) {
          throw { status: 400, message: error.errors };
        }
        throw error;
    }
  }

  async getMaterialsByWorkshopId(workshopId) {
    try {
      if (!workshopId) {
        throw { status: 400, message: "Workshop ID is required" };
      }
      const materials = await MaterialDAO.getMaterialsByWorkshopId(workshopId);
      return MaterialDTO.fromDatabaseList(materials);
    } catch (error) {
      console.error("Error in getMaterialsByWorkshop:", error);
      throw error;
    }
  }

  async deleteMaterial(materialId) {
    try {
      await MaterialDAO.deleteMaterialById(materialId);
      return { message: "Material deleted successfully" };
    } catch (error) {
      console.error("Error in deleteMaterial:", error);
      throw error;
    }
  }
}

module.exports = new MaterialService();