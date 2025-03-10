const AssignmentDAO = require("../daos/assignment.dao");
const AssignmentDTO = require("../dtos/assignment.dto");
const { NotFoundError, ValidationError } = require("../utils/errors");

class AssignmentService {
  static async createAssignment(assignmentData) {
    try {
      const createdAssignment = await AssignmentDAO.createAssignment(assignmentData);
      return AssignmentDTO.fromDatabase(createdAssignment);
    } catch (error) {
      console.error("Error creating assignment in service layer:", error);
      throw error;
    }
  }

  static async getAssignmentById(id) {
    try {
      if (!id) {
        throw new ValidationError("Assignment ID is required");
      }
      
      const assignment = await AssignmentDAO.getAssignmentById(id);
      if (!assignment) {
        throw new NotFoundError(`Assignment with ID ${id} not found`);
      }
      
      return AssignmentDTO.fromDatabase(assignment);
    } catch (error) {
      console.error("Error getting assignment by id in service layer:", error);
      throw error;
    }
  }

  static async getAllAssignments(workshopId, page = 1, limit = 10) {
    try {
      if (!workshopId) {
        throw new ValidationError("Workshop ID is required");
      }
      
      const { assignments, pagination } = await AssignmentDAO.getAssignmentsByWorkshopId(
        workshopId,
        page,
        limit
      );
      
      return {
        assignments: assignments.map(assignment => AssignmentDTO.fromDatabase(assignment)),
        pagination
      };
    } catch (error) {
      console.error("Error getting assignments by workshop id in service layer:", error);
      throw error;
    }
  }

  static async updateAssignment(id, data) {
    try {
      if (!id) {
        throw new ValidationError("Assignment ID is required");
      }
      
      // Check if assignment exists
      const existingAssignment = await AssignmentDAO.getAssignmentById(id);
      if (!existingAssignment) {
        throw new NotFoundError(`Assignment with ID ${id} not found`);
      }
      
      const updatedAssignment = await AssignmentDAO.updateAssignment(id, data);
      return AssignmentDTO.fromDatabase(updatedAssignment);
    } catch (error) {
      console.error("Error updating assignment in service layer:", error);
      throw error;
    }
  }

  static async deleteAssignment(id) {
    try {
      if (!id) {
        throw new ValidationError("Assignment ID is required");
      }

      const existingAssignment = await AssignmentDAO.getAssignmentById(id);
      if (!existingAssignment) {
        throw new NotFoundError(`Assignment with ID ${id} not found`);
      }
      
      return await AssignmentDAO.deleteAssignment(id);
    } catch (error) {
      console.error("Error deleting assignment in service layer:", error);
      throw error;
    }
  }
}

module.exports = AssignmentService;