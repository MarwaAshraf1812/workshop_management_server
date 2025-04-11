const prisma = require("../config/prisma");
const LeaderboardDAO = require("./Leaderboard.dao"); 

class ProgressDAO {
    static async createProgress(studentId, workshopId) {
        try {
            const studentExists = await prisma.workshopUsers.findFirst({
                where: {
                    user_id: studentId,
                    workshop_id: workshopId,
                },
            });

            if (!studentExists) {
                throw new Error("Student not found in workshop");
            }
            const defaultData = {
                assignments_scores: 0,
                quizes_score: 0,
                attendances: 0,
                attendance_points: 0,
                total_points: 0,
            };
            const progress = await prisma.progress.create({
                data: {
                    student_id: studentId,
                    workshop_id: workshopId,
                    ...defaultData,
                },
            });
            return progress;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static async deleteProgress(progressId) {
        try {
            const progressExists = await prisma.progress.findUnique({
                where: {
                    id: progressId,
                },
            })

            if (!progressExists) {
                throw new Error("Progress not found");
            }
            const progress = await prisma.progress.delete({
                where: {
                    id: progressId,
                },
            });

            return progress;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static async getProgress(studentId, workshopId) {
        try {
            const studentExists = await prisma.workshopUsers.findFirst({
                where: {
                    user_id: studentId,
                    workshop_id: workshopId,
                },
            });

            const user = await prisma.user.findFirst({
                where: {
                    id: studentId,
                },
            });
            if (!studentExists || !user) {
                throw new Error("Student not found in workshop or does not exist");
            }

            const progress = await prisma.progress.findFirst({
                where: {
                    student_id: studentId,
                    workshop_id: workshopId,
                },
            });

            return progress;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static async updateProgress(studentId, workshopId, edits) {
        try {
            const updated = await prisma.progress.update({
                where: {
                    student_id: studentId,
                    workshop_id: workshopId,
                },
                data: edits,
            });

            if (
                edits.attendance_points !== undefined ||
                edits.assignments_scores !== undefined ||
                edits.quizes_score !== undefined
            ) {
                await this.recalculateTotalPoints(studentId, workshopId);
            }
            return updated;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static async recalculateTotalPoints(studentId, workshopId) {
        try {
            const progress = await prisma.progress.findUnique({
                where: {
                    student_id_workshop_id: {
                        student_id: studentId,
                        workshop_id: workshopId,
                    },
                },
                select: {
                    assignments_scores: true,
                    quizes_score: true,
                    attendances: true,
                    attendance_points: true,
                },
            });

            const total =
                Number(progress.assignments_scores) +
                Number(progress.quizes_score) +
                progress.attendance_points;

            await prisma.progress.update({
                where: {
                    student_id_workshop_id: {
                        student_id: studentId,
                        workshop_id: workshopId,
                    },
                },
                data: {
                    total_points: total,
                },
            });

            await prisma.leaderBoard.update({
                where: {
                    student_id: studentId,
                },
                data: {
                    total_points: total,
                },
            });

            await LeaderboardDAO.recalculateRanks();

            return total;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static async increaseAttendance(studentId, workshopId) {
        try {
            await prisma.progress.update({
                where: {
                    student_id_workshop_id: {
                        student_id: studentId,
                        workshop_id: workshopId,
                    },
                },
                data: {
                    attendances: { increment: 1 },
                    attendance_points: { increment: 5 },
                },
            });

            return await this.recalculateTotalPoints(studentId, workshopId);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static async increaseAssignmentScore(studentId, workshopId, score) {
        try {
            await prisma.progress.update({
                where: {
                    student_id_workshop_id: {
                        student_id: studentId,
                        workshop_id: workshopId,
                    },
                },
                data: {
                    assignments_scores: { increment: score },
                },
            });

            return await this.recalculateTotalPoints(studentId, workshopId);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static async increaseQuizeScore(studentId, workshopId, score) {
        try {
            await prisma.progress.update({
                where: {
                    student_id_workshop_id: {
                        student_id: studentId,
                        workshop_id: workshopId,
                    },
                },
                data: {
                    quizes_score: { increment: score },
                },
            });
            return await this.recalculateTotalPoints(studentId, workshopId);
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = ProgressDAO;
