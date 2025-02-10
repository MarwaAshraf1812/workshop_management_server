const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class SubmissionDAO {

    static async createSubmission(studentId, assignmentId, submissionLink){
        try {
            const submission = await prisma.submission.create({
                data: {
                    student_id: studentId,
                    assignment_id: assignmentId,
                    assignment_link: submissionLink
                }
            })

            return submission;
        }
        catch(err){
            throw new Error(err.message)
        }
        finally{
            await prisma.$disconnect()
        }
    }

    static async getSubmission(studentId, assignmentId){
        try {
            const submission = await prisma.submission.findUnique({
                where: {
                    student_id: studentId,
                    assignment_id: assignmentId
                }
            })

            return submission;
        }
        catch(err){
            throw new Error(err.message);
        }
        finally{
            await prisma.$disconnect();
        }
    }

    static async getStudentSubmissions(studentId){
        try {
            const submissions = await prisma.submission.findMany({
                where: {
                    student_id: studentId,
                },
                orderBy: {
                    submitted_at: "desc"
                }
            })

            return submissions;
        }
        catch(err){
            throw new Error(err.message);
        }
        finally{
            await prisma.$disconnect();
        }
    }

}

module.exports = SubmissionDAO;