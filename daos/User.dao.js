const { PrismaClient } = require("@prisma/client");
const crypt = require('crypto-js');
const e = require("express");

const prisma = new PrismaClient()

class UserDAO{

    static async createUser(user){

        try{

            console.log(user)

            const encryptedPassword = crypt.AES.encrypt(user.password, process.env.PASSWORD_HASH);

            const createdUser = await prisma.user.create({
                data: {
                    username: user.username,
                    email: user.email,
                    password: encryptedPassword.toString(),
                }
            })

            return createdUser;
        }
        catch(error){
            throw new Error(error.message);
        }
        finally{
            await prisma.$disconnect();
        }

    }

    static async getUserById(userId){

        const user = await prisma.user.findUnique({
            where: {id: userId}
        })

        return user;
        
    }

    static async getUserByEmail(email){

        try{
            const user = await prisma.user.findUnique({
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

    static async checkEmailExists(email){

        try {

            const user = await prisma.user.findUnique({
                where: {email: email}
            })
            if (user){
                return true;
            }
            else{
                return false;
            }
        }
        catch(err){
            throw new Error(err.message);
        }
        finally{
            await prisma.$disconnect();
        }
    }

    static async updateUser(userId, newEdits){
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

    static async deleteUser(userId){
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
