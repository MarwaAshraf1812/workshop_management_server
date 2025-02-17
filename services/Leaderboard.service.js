const LeaderboardDAO = require("../daos/Leaderboard.dao");

class LeaderboardService {

    static async getStudentBoard(studentId){
        try {
            const board = await LeaderboardDAO.getLeaderboard(studentId);
            if (!board){
                throw new Error("Board not found")
            }
            return board;
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    static async getAllRanks(){
        try {
            const ranks = await LeaderboardDAO.getAllRanks();
            return ranks;
        }
        catch(err){
            throw new Error(err.message)
        }
    }

}

module.exports = LeaderboardService;