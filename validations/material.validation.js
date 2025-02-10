export class MaterialValidation extends Error {
  constructor(errors) {
    super('Material validation failed');
    this.errors = errors;
  }
}

export class MaterialValidator {
  static validate(data) {
    const errors = [];

    if (!data.title?.trim()) {
      errors.push('Title is required');
    }

    if (!data.file_url?.trim()) {
      errors.push('File URL is required');
    }

    if (!data.workshop_id) {
      errors.push('Workshop ID is required');
    }

    if (errors.length > 0) {
      throw new MaterialValidation(errors);
    }
  }
}