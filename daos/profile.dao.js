const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

class ProfileDAO{
    
    static async createProfile(data){
        try {
            const profile = await prisma.profile.create({
                data: {
                    user_id: data.user_id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                }
            })

            return profile;
        } catch(err){
            throw new Error(err.message)
        }
        finally{
            await prisma.$disconnect()
        }
    }

    static async updateProfile(userId, newUpdates){
        try {
            const profile = await prisma.profile.update({
                where: { user_id: userId },
                data: newUpdates,
            })

            return profile
        } catch(err){
            throw new Error(err.message)
        }
        finally{
            await prisma.$disconnect()
        }

    }

    static async checkExistingProfile(userId){
        try {
            const profile = await prisma.profile.findUnique({
                where: {user_id: userId}
            })
            return profile
        } catch(err){
            throw new Error(err.message)
        }
    }

}

module.exports = ProfileDAO