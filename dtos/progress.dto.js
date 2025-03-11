class ProgressDTO {
    static toResponse(progressData){
        return {
            id: progressData.id,
            attendances: progressData.attendances,
            assignments_scores: progressData.assignments_scores,
            quizes_score: progressData.quizes_score,
            total_points: progressData.total_points
        }
    }
}

module.exports = ProgressDTO