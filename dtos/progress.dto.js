class ProgressDTO {
    static toResponse(progressData){
        return {
            attendances: progressData.attendances,
            assignments_scores: progressData.assignments_scores,
            quizes_score: progressData.quizes_score,
            total_points: progressData.total_points
        }
    }
}

module.exports = ProgressDTO