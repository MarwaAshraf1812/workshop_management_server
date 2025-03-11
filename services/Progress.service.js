const ProgressDAO = require("../daos/Progress.dao");

class ProgressService {

    static async createProgress(student, workshop){
        try {
            const progress = await ProgressDAO.createProgress(student, workshop);
            return progress
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    static async getProgress(student, workshop){
        try {
            const progress = await ProgressDAO.getProgress(student, workshop);
            return progress;
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    static async attend(id){
        try {
            await ProgressDAO.increaseAttendance(id);
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    static async addAssigmentScore(id, amount){
        try {
            await ProgressDAO.increaseAssignmentScore(id, amount);
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    static async addQuizScore(id, amount){
        try {
            await ProgressDAO.increaseQuizeScore(id, amount);
        }
        catch (err){
            throw new Error(err.message);
        }
    }
}

module.exports = ProgressService