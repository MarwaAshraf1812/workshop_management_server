const SubmissionDAO = require("../daos/Submission.dao")

class SubmissionService {

    static async submitAssignment(studentId, assignmentId, assignmentData){
        try {
            const submission = await SubmissionDAO.createSubmission(studentId, assignmentId, assignmentData.link);
            return submission;
        }
        catch(err){
            throw new Error(err.message)
        }
    }
    
    static async getStudentAssignmentSubmission(studentId, assignmentId){
        try {
            const submission = await SubmissionDAO.getSubmission(studentId, assignmentId);
            return submission;
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    static async getStudentSubmissions(studentId){
        try {
            const submissions = await SubmissionDAO.getStudentSubmissions(studentId);
            return submissions;
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    static async addFeedback(submissionId, feedback){
        try {
            const updated = await SubmissionDAO.updateSubmission(submissionId, {feedback})
            return updated;
        }
        catch(err){
            throw new Error(err.message)
        }
    }

}

module.exports = SubmissionService