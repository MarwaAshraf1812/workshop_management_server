const userDTO = require("../dtos/user.dto");
const AuthService = require("../services/Auth.service")

const AuthController = {
    async register(req, res){
        try{

            const user = await AuthService.createUser(req.body);
            return res.status(200).json(userDTO.toResponse(user))

        } catch(err){
            return res.status(400).json({"error": err.message})
        }
    }
}

module.exports = AuthController