const UserDAO = require("../daos/User.dao")
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken');
const { signUpSchema } = require("../validations/user.validation");

class AuthService{
    
    dao = new UserDAO();

    static async createUser(user){

        try{
            const existingUser = await this.dao.getUserByEmail(user.email);
    
            if (existingUser){
                throw new Error("Email is used")
            }
    
            const createdUser = await this.dao.createUser(user);
            
            return createdUser()
            
        } catch (err){
            console.error(err);
            throw new Error(err.message);
        }
    }

    static async authenticateUser(email, password){

        try{

            const user = await this.dao.getUserByEmail(email);

            if (!user){
                throw new Error("User doesn't exits")
            }

            const originalPass = crypto.AES.decrypt(user.password, process.env.PASSWORD_HASH);

            if (originalPass != password){
                throw new Error("Invalid password");
            }

            const accessToken = jwt.sign({
                id: user.id,
                role: user.role
            })

            return {accessToken, user}

        } catch (err){
            console.error(err.message);
            throw new Error(err.message)
        }

        
    }

}

module.exports = AuthService
