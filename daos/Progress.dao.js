const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

class ProgressDAO {
    
    static async getProgress(studentId, workshopId){
        try{
            const progress = await prisma.progress.findUnique({
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

    static async updateProgress(studentId, workshopId, edits){
        try{
            const updated = await prisma.progress.update({
                where: {
                    student_id: studentId,
                    workshop_id: workshopId
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
}

module.exports = ProgressDAO