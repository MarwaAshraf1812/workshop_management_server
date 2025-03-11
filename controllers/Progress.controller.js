const ProgressDTO = require("../dtos/progress.dto");
const ProgressService = require("../services/Progress.service");

class ProgressController {

    static async createProgress(req, res){
        try {
            const {student_id, workshop_id} = req.body;
            const progress = await ProgressService.createProgress(student_id, workshop_id);
            
            return res.status(201).json(ProgressDTO.toResponse(progress));
        }
        catch(err){
            return res.status(505).json({error: err.message})
        }
    }
    
    static async getProgress(req, res){
        try {
            const {student_id, workshop_id} = req.params;
            const progerss = await ProgressService.getProgress(student_id, workshop_id);
            return res.status(200).json(ProgressDTO.toResponse(progerss));
        }
        catch(err){
            return res.status(505).json({error: err.message})
        }
    }

    static async attend(req, res){
        try {
            const {progress_id} = req.params;
            await ProgressService.attend(progress_id);
            return res.status(200).send("Attendances increased");
        }
        catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async addAssignmentGrade(req, res){
        try {
            const {progress_id} = req.params;
            
            await ProgressService.addAssigmentScore(progress_id, req.body.score);
            return res.status(200).send("Assignment score added");
        }
        catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async addQuizGrade(req, res){
        try {
            const {progress_id} = req.params;
            
            await ProgressService.addQuizScore(progress_id, req.body.score);
            return res.status(200).send("Quiz score added");
        }
        catch(err){
            return res.status(500).json({error: err.message})
        }
    }

}

module.exports = ProgressController