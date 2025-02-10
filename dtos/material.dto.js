const { MaterialValidator } = rquire('../validations/material.validation');

export class MaterialDTO {
  constructor({id, title, file_url, workshop_id, material_type, created_at}) {
    this.id = id;
    this.title = title;
    this.file_url = file_url;
    this.workshop_id = workshop_id;
    this.material_type = material_type;
    this.created_at = created_at;
  }

  static fromRequest(body) {
    MaterialValidator.validate(body);
    return new MaterialDTO({
      title: body.title,
      material_type: body.material_type,
      file_url: body.file_url,
      workshop_id: body.workshop_id
    })
  }

  static fromDatabase(material) {
    return new MaterialDTO({
      id: material.id,
      title: material.title,
      file_url: material.file_url,
      workshop_id: material.workshop_id,
      material_type: material.material_type,
      created_at: material.created_at
    });
  }


  static fromDatabaseList(materials) {
    return materials.map(material => new MaterialDTO({
      id: material.id,
      title: material.title,
      file_url: material.file_url,
      workshop_id: material.workshop_id,
      material_type: material.material_type,
      created_at: material.created_at
    }));
  }
}