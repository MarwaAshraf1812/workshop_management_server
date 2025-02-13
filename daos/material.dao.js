const prisma = require("../config/prisma");

class MaterialDAO {
  async uploadMaterial({ MaterialData }) {
    try {
      return await prisma.material.create({
        data: MaterialData
      })
    } catch (error) {
      console.error("Error uploading material:",error);
      throw { status: 500, message: "Failed to upload material" };
    }
  }

  async getMaterialsByWorkshopId({ workshopId }) {
    try {
      return await prisma.material.findMany({
        where: {
          workshopId: workshopId
        }
      })
    } catch (error) {
      console.error("Error getting materials by workshop id:",error);
      throw { status: 500, message: "Failed to get materials by workshop id" };
    }
  }

  async deleteMaterialById({ materialId }) {
    try {
      const material = await prisma.material.findUnique({
        where: { id: materialId },
      });
  
      if (!material) {
        throw { status: 404, message: "Material not found" };
      }
  
      return await prisma.material.delete({
        where: { id: materialId },
      });
    } catch (error) {
      console.error("Error deleting material by id:", error);
      throw { status: 500, message: "Failed to delete material" };
    }
  }
}  

module.exports = new MaterialDAO();