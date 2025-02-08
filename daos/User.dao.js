const { PrismaClient } = require("@prisma/client");
const crypt = require('crypto-js')

const prisma = new PrismaClient()

class UserDAO{

    async createUser(username, password){

        const user = await prisma.user.create({
            data: {
                username: username,
                password: crypt.AES.encrypt(password, process.env.PASSWORD_HASH)
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
}

module.exports = UserDAO