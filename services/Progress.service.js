const ProgressDAO = require("../daos/Progress.dao");

class ProgressService {
    static async createProgress(student, workshop){
        try {
            const progress = await ProgressDAO.createProgress(student, workshop);
            return progress;
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    static async deleteProgress(student, workshop){
        try {
            const progress = await ProgressDAO.deleteProgress(student, workshop);
            return progress;
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

    static async attend(student, workshop){
        try {
            await ProgressDAO.increaseAttendance(student, workshop);
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    static async addAssigmentScore(student, workshop, amount){
        try {
            await ProgressDAO.increaseAssignmentScore(student, workshop, amount);
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    static async addQuizScore(student, workshop, amount){
        try {
            await ProgressDAO.increaseQuizeScore(student, workshop, amount);
        }
        catch (err){
            throw new Error(err.message);
        }
    }
}

module.exports = ProgressService