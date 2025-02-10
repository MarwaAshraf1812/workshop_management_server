const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

class Leaderboard {

    static async getLeaderboard(studentId){
        try {
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
        finally{
            await prisma.$disconnect();
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
        finally{
            await prisma.$disconnect();
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

            await Leaderboard.recalculateRanks();
        }
        catch(err){
            throw new Error(err.message)
        }
        finally{
            await prisma.$disconnect()
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

module.exports = Leaderboard