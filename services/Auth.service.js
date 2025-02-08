const UserDAO = require("../daos/User.dao")
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')

class AuthService{
    
    dao = new UserDAO();

    async authenticateUser(id, password){
        const user = await this.dao.getUserById(id);

        if (!user){
            return null;
        }

        const originalPass = crypto.AES.decrypt(user.password, process.env.PASSWORD_HASH);

        if (originalPass != password){
            throw new Error("Invalid password");
        }

        const accessToken = jwt.sign({
            id: user.id,
        })
        
    }

}

module.exports = AuthService