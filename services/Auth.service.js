const UserDAO = require("../daos/User.dao")
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken');


class AuthService{

    static async createUser(user){

        try{
            const existingUser = await UserDAO.checkEmailExists(user.email);
    
            if (existingUser){
                throw new Error("Email is used");
            }
    
            const createdUser = await UserDAO.createUser(user);
            
            return createdUser;
            
        } catch (err){
            console.error(err);
            throw new Error(err.message);
        }
    }

    static async authenticateUser(email, password){

        try{

            const user = await UserDAO.getUserByEmail(email);

            if (!user){
                throw new Error("User doesn't exits")
            }

            const originalPass = crypto.AES.decrypt(user.password, process.env.PASSWORD_HASH).toString(crypto.enc.Utf8);

            if (originalPass != password){
                throw new Error("Invalid password");
            }

            const accessToken = jwt.sign({
                id: user.id,
                role: user.role
            }, process.env.JWT_KEY)

            return {accessToken, user}

        } catch (err){
            console.error(err.message);
            throw new Error(err.message)
        }

        
    }

}

module.exports = AuthService
