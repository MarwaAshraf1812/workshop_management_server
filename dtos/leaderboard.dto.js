class LeaderboardDTO {
    static toResponse(data){
        return {
            student_id: data.student_id,
            total_points: data.total_points,
            rank: data.rank
        }
    }
}

module.exports = LeaderboardDTO