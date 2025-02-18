const WorkshopService = require('../services/workshop.service');
const WorkshopDTO  = require('../dtos/workshop.dto');
const { WorkshopUsersDTO } = require('../dtos/workshopUser.dto');

class WorkshopController {
  async createWorkshop(req, res) {
    try {
      console.log(req.body);
      const workshop = WorkshopDTO.fromRequest(req.body);
      const createdWorkshop = await WorkshopService.createWorkshop(workshop);
      return res.status(201).json(createdWorkshop);
    } catch (error) {
      console.error("Error creating workshop:", error);
      res.status(400).json({ message: error.message });
    }
  }

  async getAllWorkshops(req, res) {
    try {
      const workshops = await WorkshopService.getAllWorkshops();
      return res.status(200).json(workshops);
    } catch (error) {
      console.error("Error retrieving workshops:", error);
      res.status(500).send("Failed to retrieve workshops");
    }
  }

  async getWorkshopById(req, res) {
    try {
      const workshop = await WorkshopService.getWorkshopById(req.params.id);
      return res.status(200).json(workshop);
    } catch (error) {
      console.error("Error retrieving workshop:", error);
      res.status(500).send("Failed to retrieve workshop");
    }
  }

  async updateWorkshop(req, res) {
    try {
      const workshop = WorkshopDTO.fromRequest(req.body);
      const updatedWorkshop = await WorkshopService.updateWorkshop(req.params.id, workshop);
      return res.status(200).json(updatedWorkshop);
    } catch (error) {
      console.error("Error updating workshop:", error);
      res.status(500).send("Failed to update workshop");
    }
}

  async deleteWorkshop(req, res) {
    try {
      await WorkshopService.deleteWorkshop(req.params.id);
      res.status(200).json({ message: "Workshop deleted successfully" });
    } catch (error) {
      console.error("Error deleting workshop:", error);
      res.status(500).send("Failed to delete workshop");
    }
  }

  async addUserToWorkshop(req, res) {
    try {
      if (!req.user || !req.user.id) {
        res.status(401).json({ message: "Unauthorized" });
      }
      const workshop = await WorkshopService.addUserToWorkshop(req.params.id, req.user.id);
      res.status(201).json(workshop);
    } catch (error) {
      console.error("Error adding user to workshop:", error);
      res.status(500).send("Failed to add user to workshop");
    }
  }

  async removeUserFromWorkshop(req, res) {
    try {
      const { user_id } = req.body;
      await WorkshopService.removeUserFromWorkshop(req.params.id, user_id);
      res.status(204).send();
    } catch (error) {
      console.error("Error removing user from workshop:", error);
      res.status(500).send("Failed to remove user from workshop");
    }
  }

  async getWorkshopUsers(req, res) {
    try {
      const workshopUsers = await WorkshopService.getWorkshopUsers(req.params.id);
      res.status(200).json(workshopUsers);
    } catch (error) {
      console.error("Error retrieving workshop users:", error);
      res.status(500).send("Failed to retrieve workshop users");
    }
  }

  async getUserWorkshops(req, res) {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const workshops = await WorkshopService.getUserWorkshops(req.user.id);
      return res.status(200).json(workshops);
    } catch (error) {
      console.error("Error retrieving user workshops:", error);
      res.status(500).send("Failed to retrieve user workshops");
    }
  }
}

module.exports = new WorkshopController();
