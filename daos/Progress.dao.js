const { PrismaClient } = require("@prisma/client");
const LeaderboardDAO = require("./Leaderboard.dao");

const prisma = new PrismaClient()

class ProgressDAO {

    static async createProgress(studentId, workshopId){
        try {
            const progress = await prisma.progress.create({
                data: {
                    student_id: studentId,
                    workshop_id: workshopId
                }
            })

            return progress;
        }
        catch (err){
            throw new Error(err.message)
        }
        finally {
            await prisma.$disconnect();
        }
    }
    
    static async getProgress(studentId, workshopId){
        try{
            const progress = await prisma.progress.findFirst({
                where:{
                    student_id: studentId,
                    workshop_id: workshopId
                }
            })
            return progress;
        }
        catch(err){
            throw new Error(err.message);
        }
        finally{
            await prisma.$disconnect();
        }
    }

    static async updateProgress(id, edits){
        try{
            const updated = await prisma.progress.update({
                where: {
                    id: id
                },
                data: {edits}
            })
            return updated;
        }
        catch(err){
            throw new Error(err.message)
        }
        finally{
            await prisma.$disconnect()
        }
    }

    static async increaseAttendance(id){
        try {
            const progress = await prisma.progress.update({
                where: {
                    id: id
                },
                data:{
                    attendances: {increment: 1},
                },
            })

            await LeaderboardDAO.addPoints(progress.student_id, 1);

            return progress;
        }
        catch (err){
            throw new Error(err.message);
        }
        finally{
            await prisma.$disconnect();
        }
    }

    static async increaseAssignmentScore(id, score){
        try{
            const progress = await prisma.progress.update({
                where: {
                    id: id
                },
                data: { 
                    assignments_scores: {increment: score},
                    total_points: {increment: score}
                }
            })
            await LeaderboardDAO.addPoints(progress.student_id, score);
            return progress;
        }
        catch(err){
            throw new Error(err.message);
        }
        finally{
            await prisma.$disconnect();
        }
    }

    static async increaseQuizeScore(id, score){
        try{
            const progress = await prisma.progress.update({
                where: {
                    id: id
                },
                data: {
                    quizes_score: {increment: score},
                    total_points: {increment: score}
                }
            })

            await LeaderboardDAO.addPoints(progress.student_id, score);

            return progress;
        }
        catch(err){
            throw new Error(err.message)
        }
        finally{
            await prisma.$disconnect();
        }
    }
}

module.exports = ProgressDAO