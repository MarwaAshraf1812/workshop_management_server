const { WorkshopValidator } = require('../validations/workshop.validation');

export class WorkshopDTO {
  constructor({ id, title, description, start_date, end_date, online, created_at, updated_at }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.start_date = start_date;
    this.end_date = end_date;
    this.online = online;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromRequest(body) {
    WorkshopValidator.validate(body);
    return new WorkshopDTO({
      id: body.id,
      title: body.title,
      description: body.description,
      start_date: body.start_date,
      end_date: body.end_date,
      online: body.online,
    })
  }

  static fromDatabase(workshop) {
    return new WorkshopDTO({
      id: workshop.id,
      title: workshop.title,
      description: workshop.description,
      start_date: workshop.start_date,
      end_date: workshop.end_date,
      online: workshop.online,
      created_at: workshop.created_at,
      updated_at: workshop.updated_at
    });
  }


  static fromDatabaseList(workshops) {
    return workshops.map(workshop => new WorkshopDTO({
      id: workshop.id,
      title: workshop.title,
      description: workshop.description,
      start_date: workshop.start_date,
      end_date: workshop.end_date,
      online: workshop.online,
    }));
  }
}