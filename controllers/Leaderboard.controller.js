const LeaderboardDTO = require("../dtos/leaderboard.dto");
const LeaderboardService = require("../services/Leaderboard.service");

class LeaderboardController {

    static async listAllRanks(req, res){
        try {
            const ranks = await LeaderboardService.getAllRanks();
            return res.status(200).json(ranks);
        }
        catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async getStudentBoard(req, res){
        try{
            const {student_id} = req.params;
            const board = await LeaderboardService.getStudentBoard(student_id);
            return res.status(200).json(LeaderboardDTO.toResponse(board));
        }
        catch(err){
            return res.status(500).json({error: err.message})
        }
    }
}

module.exports = LeaderboardController