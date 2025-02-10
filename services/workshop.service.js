const WorkshopDAO = require('../daos/workshop.dao');
const { WorkshopDTO } = require('../dtos/workshop.dto');
const { WorkshopUsersDTO } = require('../dtos/workshopUser.dto');
const { WorkshopValidator, WorkshopValidation } = require('../validations/workshop.validation');
const { WorkshopError } = require('../errors/workshop.error');

class WorkshopService {
  async createWorkshop(workshopData) {
    try {
      WorkshopValidator.validate(workshopData);
      const workshop = await WorkshopDAO.createWorkshop(workshopData);
      return WorkshopDTO.fromDatabase(workshop);
    } catch (error) {
      if (error instanceof WorkshopValidation) {
        throw { status: 400, message: error.errors };
      }
      throw error;
    }
  }

  async getAllWorkshops() {
    try {
      const workshops = await WorkshopDAO.getAllWorkshops();
      return WorkshopDTO.fromDatabaseList(workshops);
    } catch (error) {
      console.error("Error in getAllWorkshops:", error);
      throw error;
    }
  }

  async getWorkshopById(workshopId) {
    try {
      const workshop = await WorkshopDAO.getWorkshopById(workshopId);
      if (!workshop) {
        throw { status: 404, message: "Workshop not found" };
      }
      return WorkshopDTO.fromDatabase(workshop);
    } catch (error) {
      if (error instanceof WorkshopValidation) {
        throw { status: 400, message: error.errors };
      }
      throw error;
    }
  }

  async updateWorkshop(workshopId, workshopData) {
    try {
      WorkshopValidator.validate(workshopData);

      const workshop = await WorkshopDAO.updateWorkshop(workshopId, workshopData);
      if (!workshop) {
        throw { status: 404, message: "Workshop not found" };
      }
      return WorkshopDTO.fromDatabase(workshop);
    } catch (error) {
      if (error instanceof WorkshopValidation) {
        throw { status: 400, message: error.errors };
      }
      throw error;
    }
  }

  async deleteWorkshop(workshopId) {
    try {
      const workshop = await WorkshopDAO.getWorkshopById(workshopId);
      if (!workshop) {
        throw { status: 404, message: "Workshop not found" };
      }
      await WorkshopDAO.deleteWorkshop(workshopId);
      return { status: 200, message: "Workshop deleted successfully" };
    } catch (error) {
      console.error("Error deleting workshop:", error);
      throw error;
    }
  }

  async addUserToWorkshop(workshopId, userId) {
    try {
      const existingEntry = await WorkshopDAO.getWorkshopUser(workshopId, userId);
      if (existingEntry) {
        throw { status: 400, message: "User is already assigned to this workshop" };
      }
      const workshopUsers = await WorkshopDAO.addUserToWorkshop(workshopId, userId);
      return WorkshopUsersDTO.fromDatabase(workshopUsers);
    } catch (error) {
      if (error.code === "23505") {
        throw { status: 400, message: "User is already in this workshop" };
      }
      console.error("Error adding user to workshop:", error);
      throw error;
    }
  }

  async removeUserFromWorkshop(workshopId, userId) {
    try {
      const workshopUsers = await WorkshopDAO.removeUserFromWorkshop(workshopId, userId);
      if (!workshopUsers) {
        throw { status: 404, message: "User not found in workshop" };
      }
      return WorkshopUsersDTO.fromDatabase(workshopUsers);
    } catch (error) {
      console.error("Error removing user from workshop:", error);
      throw error;
    }
  }

  async getWorkshopUsers(workshopId) {
    try {
      const workshopUsers = await WorkshopDAO.getWorkshopUsers(workshopId);
      if (!workshopUsers || workshopUsers.length === 0) {
        throw { status: 404, message: "No users found for this workshop" };
      }
      return WorkshopUsersDTO.fromDatabaseList(workshopUsers);
    } catch (error) {
      console.error("Error retrieving workshop users:", error);
      throw error;
    }
  }

  async getUserWorkshops(userId) {
    try {
      const workshops = await WorkshopDAO.getUserWorkshops(userId);
      return WorkshopDTO.fromDatabaseList(workshops);
    } catch (error) {
      console.error("Error retrieving user workshops:", error);
      throw error;
    }
  }
}

module.exports = new WorkshopService();
