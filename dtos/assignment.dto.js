class AssignmentDTO {
  constructor({
    id,
    title,
    description,
    deadline,
    workshop_id,
    total_points = 0,
    assignment_link,
    created_at,
    updated_at,
    workshop = null
  }) {
    this.id = id || null;
    this.title = title;
    this.description = description;
    this.deadline = this.validateDeadline(deadline);
    this.workshop_id = workshop_id;
    this.total_points = total_points ?? 0;
    this.assignment_link = assignment_link;
    this.created_at = created_at ? new Date(created_at) : null;
    this.updated_at = updated_at ? new Date(updated_at) : null;
    
    if (workshop) {
      this.workshop = {
        id: workshop.id,
        name: workshop.name
      };
    }
  }
  
  static fromRequest(body) {
    return new AssignmentDTO({
      title: body.title,
      description: body.description,
      deadline: body.deadline,
      workshop_id: body.workshop_id,
      total_points: body.total_points,
      assignment_link: body.assignment_link,
    });
  }
  
  static fromDatabase(assignment) {
    return new AssignmentDTO({
      id: assignment.id,
      title: assignment.title,
      description: assignment.description,
      deadline: assignment.deadline,
      workshop_id: assignment.workshop_id,
      total_points: assignment.total_points,
      assignment_link: assignment.assignment_link,
      created_at: assignment.created_at,
      updated_at: assignment.updated_at,
      workshop: {
        id: assignment.workshop.id,
        name: assignment.workshop.title,
      },
    });
  }
  
  
  validateDeadline(deadline) {
    if (!deadline) {
      throw new Error("Deadline is required");
    }
    
    const date = new Date(deadline);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid deadline format");
    }
    
    return date;
  }
  
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      deadline: this.deadline,
      workshop_id: this.workshop_id,
      total_points: this.total_points,
      assignment_link: this.assignment_link,
      created_at: this.created_at,
      updated_at: this.updated_at,
      workshop: this.workshop
    };
  }
}

module.exports = AssignmentDTO;