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

  async getMaterialsByWorkshopId({workshopId}) {
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

  async deleteMaterialById(materialId ) {
    try {
      if (!materialId) {
        throw new Error("Material ID is required");
      }
  
      const material = await prisma.material.findUnique({
        where: { id: materialId }
      });
  
      if (!material) {
        return {message: "Material not found"};
      }
  
      await prisma.material.delete({
        where: { id: materialId }
      });
  
      return { success: true, message: "Material deleted successfully" };
    } catch (error) {
      console.error("Error deleting material:", error);
      throw error;
    }
  }
  
}  

module.exports = new MaterialDAO();