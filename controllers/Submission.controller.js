const SubmissionDTO = require("../dtos/submission.dto")
const SubmissionService = require("../services/Submission.service")

class SubmissionController {

    static async submitAssignment(req, res){

        try{
            const {student_id, assignment_id, ...rest} = SubmissionDTO.fromRequest(req.body)
            const submission = await SubmissionService.submitAssignment(student_id, assignment_id, rest)
    
            return res.status(201).json(SubmissionDTO.toResponse(submission));
        }
        catch(err){
            return res.status(500).json({error: err.message})
        }

    }

    static async getStudentAssignmentSubmission(req, res){
        try {
            const {student_id, assignment_id} = req.params;
            const submission = await SubmissionService.getStudentAssignmentSubmission(student_id, assignment_id);
            return res.status(200).json(SubmissionDTO.toResponse(submission))
        }
        catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async getStudentSubmissions(req, res){
        try {
            const {student_id} = req.params;
            const submissions = await SubmissionService.getStudentSubmissions(student_id);
            return res.status(200).json(submissions);
        }
        catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async addFeedback(req, res){
        try {
            const {submission_id} = req.params;
            const {feedback} = req.body
            const submissionWithFeedback = await SubmissionService.addFeedback(submission_id, feedback);
            return res.status(200).json(SubmissionDTO.toResponse(submissionWithFeedback))
        }
        catch(err){
            return res.status(500).json({error: err.message})
        }
    }

}

module.exports = SubmissionController