class QuizDTO {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.deadline = data.deadline;
    this.workshop_id = data.workshop_id;
    this.quiz_link = data.quiz_link;
    this.total_points = data.total_points;
    this.created_at = data.created_at;
    this.workshop = workshop ? {
      id: workshop.id,
      name: workshop.title,
    } : null;
  }

  static fromRequest(data) {
    return new QuizDTO ({
      title: data.title,
      deadline: data.deadline,
      workshop_id: data.workshop_id,
      quiz_link: data.quiz_link,
      total_points: data.total_points,
    });
  }

  static fromDatabase(data) {
    return new QuizDTO ({
      id: data.id,
      title: data.title,
      deadline: data.deadline,
      workshop_id: data.workshop_id,
      quiz_link: data.quiz_link,
      total_points: data.total_points,
      created_at: data.created_at,
    })
  }
}

module.exports = QuizDTO;