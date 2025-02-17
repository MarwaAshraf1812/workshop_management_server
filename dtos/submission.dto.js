class SubmissionDTO {
    static fromRequest(data){
        return {
            student_id: data.student_id,
            assignment_id: data.assignment_id,
            assignment_link: data.assignment_link,
            submitted_at: data.submitted_at,
        }
    }

    static toResponse(data){
        return {
            student_id: data.student_id,
            assignment_id: data.assignment_id,
            assignment_link: data.assignment_link,
            submitted_at: data.submitted_at,
            feedback: data.feedback
        }
    }
}

module.exports = SubmissionDTO