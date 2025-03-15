const AssignmentService = require("../services/assignment.service");
const assignmentSchema = require("../validations/assignment.validation");
const { ValidationError, NotFoundError } = require("../utils/errors");
const AssignmentDTO = require("../dtos/assignment.dto");

class AssignmentController {
  static async addNewAssignment(req, res) {
    try {
      const assignment = await AssignmentService.createAssignment(req.body);
  
      if (!assignment) {
        return res.status(400).json({ message: "Failed to create assignment." });
      }
  
      return res.status(201).json({
        message: "Assignment created successfully",
        data: assignment,
      });
  
    } catch (error) {
      if (error.message === "Workshop not found") {
        return res.status(404).json({ message: "Workshop not found. Please provide a valid workshop ID." });
      }
      console.error("Error creating assignment:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getAssignmentById(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ 
          success: false, 
          error: "Assignment ID is required" 
        });
      }
      
      const assignment = await AssignmentService.getAssignmentById(id);
      
      return res.status(200).json({
        success: true,
        data: assignment
      });
    } catch (error) {
      console.error("Error getting assignment by id in controller layer:", error);
      
      if (error instanceof NotFoundError) {
        return res.status(404).json({ success: false, error: error.message });
      }
      
      if (error instanceof ValidationError) {
        return res.status(400).json({ success: false, error: error.message });
      }
      
      return res.status(500).json({ 
        success: false, 
        error: "Failed to retrieve assignment" 
      });
    }
  }

  static async getAllAssignments(req, res) {
    try {
      const { workshopId } = req.body;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      
      if (!workshopId) {
        return res.status(400).json({ 
          success: false, 
          error: "Workshop ID is required" 
        });
      }
      
      const result = await AssignmentService.getAllAssignments(workshopId, page, limit);
      
      return res.status(200).json({
        success: true,
        data: result.assignments,
        pagination: result.pagination
      });
    } catch (error) {
      console.error("Error getting assignments in controller layer:", error);
      
      if (error instanceof ValidationError) {
        return res.status(400).json({ success: false, error: error.message });
      }
      
      return res.status(500).json({ 
        success: false, 
        error: "Failed to retrieve assignments" 
      });
    }
  }

  static async updateAssignment(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ 
          success: false, 
          error: "Assignment ID is required" 
        });
      }
      
      const { error } = assignmentSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ 
          success: false, 
          error: error.details[0].message 
        });
      }

      const assignment = await AssignmentService.updateAssignment(id, req.body);
      
      return res.status(200).json({
        success: true,
        data: assignment
      });
    } catch (error) {
      console.error("Error updating assignment in controller layer:", error);
      
      if (error instanceof NotFoundError) {
        return res.status(404).json({ success: false, error: error.message });
      }
      
      if (error instanceof ValidationError) {
        return res.status(400).json({ success: false, error: error.message });
      }
      
      return res.status(500).json({ 
        success: false, 
        error: "Failed to update assignment" 
      });
    }
  }

  static async deleteAssignment(req, res) {
    try {
      const { id } = req.params;

      console.log("Received ID:", id, "Type:", typeof id);

      
      if (!id) {
        return res.status(400).json({ 
          success: false, 
          error: "Assignment ID is required" 
        });
      }
      
      const deletedAssignment = await AssignmentService.deleteAssignment(id);
      if (deletedAssignment) {
        return res.status(200).json({ 
          success: true, 
          message: "Assignment deleted successfully"
        });
      }

    } catch (error) {
      console.error("Error deleting assignment in controller layer:", error);
      
      if (error instanceof NotFoundError) {
        return res.status(404).json({ success: false, error: error.message });
      }
      
      if (error instanceof ValidationError) {
        return res.status(400).json({ success: false, error: error.message });
      }
      
      return res.status(500).json({ 
        success: false, 
        error: "Failed to delete assignment" 
      });
    }
  }
}

module.exports = AssignmentController;