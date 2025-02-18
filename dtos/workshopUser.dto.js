class WorkshopUsersDTO {
  constructor({ workshop_id, user_id }) {
    this.workshop_id = workshop_id;
    this.user_id = user_id;
  }

  static fromRequest(body) {
    return new WorkshopUsersDTO({
      workshop_id: body.workshop_id,
      user_id: body.user_id
    })
  }

  static fromDatabase(workshop) {
    return new WorkshopUsersDTO({
      workshop_id: workshop.id,
      user_id: workshop.user_id
    });
  }

  static fromDatabaseList(workshops) {
    return workshops.map(workshop => new WorkshopUsersDTO({
      workshop_id: workshop.id,
      user_id: workshop.user_id
    }));
  }
}

module.exports = WorkshopUsersDTO;