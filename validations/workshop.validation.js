export class WorkshopValidation extends Error {
  constructor(errors) {
    super('Workshop validation failed');
    this.errors = errors;
  }
}

export class WorkshopValidator {
  static validate(data) {
    const errors = [];

    if (!data.title?.trim()) {
      errors.push('Title is required');
    }

    if (!data.description?.trim()) {
      errors.push('Description is required');
    }

    if (!data.start_date) {
      errors.push('Start date is required');
    }

    if (!data.end_date) {
      errors.push('End date is required');
    }

    if (data.start_date && data.end_date && data.start_date >= data.end_date) {
      errors.push('End date must be after start date');
    }

    if (errors.length > 0) {
      throw new WorkshopValidation(errors);
      }
  }
}