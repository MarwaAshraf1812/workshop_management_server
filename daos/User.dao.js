const { PrismaClient } = require("@prisma/client");
const crypt = require('crypto-js')

const prisma = new PrismaClient()

class UserDAO{

    async createUser(user){

        const user = await prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                password: crypt.AES.encrypt(user.password, process.env.PASSWORD_HASH)
            }
        })

        return user;
    }

    async getUserById(userId){

        const user = await prisma.user.findUnique({
            where: {id: userId}
        })

        return user;
        
    }

    async getUserByEmail(email){

        try{
            const user = await prisma.findUnique({
                where: {email: email}
            })

            if (!user){
                console.error("User not found");
                return null;
            }

            return user;

        } catch(err){
            throw new Error(err.message)
        }
    }

    async updateUser(userId, newEdits){
        try{
            const updatedUser = await prisma.user.update({
                where: {id: userId},
                data: newEdits
            });

            return updatedUser;
        } catch (err){
            throw new Error(err.message)
        }
    }

    async deleteUser(userId){
        try {

            await prisma.user.delete({
                where: {id: userId}
            })

        } catch (err){
            throw new Error(err.message);
        }
    }
}

module.exports = UserDAO
