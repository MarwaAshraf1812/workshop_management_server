class ProgressDTO {
    static toResponse(progressData){
        if (!progressData) {
            return {
                assignments_scores: 0,
                quizes_score: 0,
                attendances: 0,
                attendance_points: 0,
                total_points: 0
            };
        }
    
        return {
            assignments_scores: progressData.assignments_scores,
            quizes_score: progressData.quizes_score,
            attendances: progressData.attendances,
            attendance_points: progressData.attendance_points,
            total_points: progressData.total_points
        };
    }

    static fromRequest(req){
        return {
            student_id: req.params.student_id,
            workshop_id: req.params.workshop_id,
            score: req.body.score? req.body.score : null,
        }
    }
}

module.exports = ProgressDTO