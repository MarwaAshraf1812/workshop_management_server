const prisma = require('../config/prisma');

class LeaderboardDAO {
    static async ensureBoard(studentId) {
        const existing = await prisma.leaderBoard.findUnique({
            where: { student_id: studentId }
        });
    
        if (!existing) {
            return await prisma.leaderBoard.create({
                data: {
                    student_id: studentId,
                    total_points: 0,
                    rank: 0
                }
            });
        }
    
        return existing;
    }
    

    static async getLeaderboard(studentId){
        try {
            await this.ensureBoard(studentId);

            const leaderboard = await prisma.leaderBoard.findUnique({
                where: {
                    student_id: studentId
                }
            })

            return leaderboard;
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    static async getAllRanks(){
        try {
            const ranks = await prisma.leaderBoard.findMany({
                orderBy: {
                    rank: 'asc'
                }
            })

            return ranks;
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    static async addPoints(studentId, new_points){
        try {
            await prisma.leaderBoard.update({
                where: {student_id: studentId},
                data: {
                    total_points: {increment: new_points}
                }
            }) 

            await this.recalculateRanks();

        }
        catch(err){
            throw new Error(err.message)
        }
    }

    static async recalculateRanks(){
        const students = await prisma.leaderBoard.findMany({
            orderBy:{
                total_points: 'desc'
            }
        })

        const updates = students.map((s, i)=>{
            return prisma.leaderBoard.update({
                where: {student_id: s.student_id},
                data: {rank: i+1}
            })
        })

        await prisma.$transaction(updates)
    }

}

module.exports = LeaderboardDAO