const ProgressDTO = require("../dtos/progress.dto");
const ProgressService = require("../services/Progress.service");

class ProgressController {
    static async create(req, res){
        try{
            const {student_id, workshop_id} = req.params;
            if (!student_id || !workshop_id) {
                return res.status(400).json({error: "Missing parameters"});
            }
            const progress = await ProgressService.createProgress(student_id, workshop_id);
            return res.status(200).json(ProgressDTO.toResponse(progress));

        } catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async delete(req, res){
        try{
            const { progress_id } = req.params;
            if (!progress_id) {
                return res.status(400).json({error: "Missing parameters"});
            }
            const progress = await ProgressService.deleteProgress(progress_id);
            if (!progress) {
                return res.status(404).json({error: "Progress not found"});
            }
            return res.status(200).send("Progress deleted");
        } catch(err){
            return res.status(500).json({error: err.message})
        }
    }
    
    static async getProgress(req, res){
        console.log("User from token:", req.user); 
        try {
            const {student_id, workshop_id} = req.params;
            if (!student_id || !workshop_id) {
                return res.status(400).json({error: "Missing parameters"});
            }
            const progerss = await ProgressService.getProgress(student_id, workshop_id);
            return res.status(200).json(ProgressDTO.toResponse(progerss));
        }
        catch(err){
            return res.status(505).json({error: err.message})
        }
    }

    static async attend(req, res){
        try {
            const {student_id, workshop_id} = req.params;
            if (!student_id || !workshop_id) {
                return res.status(400).json({error: "Missing parameters"});
            }
            await ProgressService.attend(student_id, workshop_id);
            return res.status(200).send("Attendances increased");
        }
        catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async addAssignmentGrade(req, res){
        try {
            const {student_id, workshop_id} = req.params;
            if (!student_id || !workshop_id) {
                return res.status(400).json({error: "Missing parameters"});
            }
            if (!req.body.score) {
                return res.status(400).json({error: "Missing score"});
            }
            if (req.body.score < 0 || req.body.score > 100) {
                return res.status(400).json({error: "Score must be between 0 and 100"});
            }
            await ProgressService.addAssigmentScore(student_id, workshop_id, req.body.score);
            return res.status(200).send("Assignment score added");
        }
        catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async addQuizGrade(req, res){
        try {
            const {student_id, workshop_id} = req.params;
            
            await ProgressService.addQuizScore(student_id, workshop_id, req.body.score);
            return res.status(200).send("Quiz score added");
        }
        catch(err){
            return res.status(500).json({error: err.message})
        }
    }

}

module.exports = ProgressController