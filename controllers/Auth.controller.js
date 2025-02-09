const userDTO = require("../dtos/user.dto");
const AuthService = require("../services/Auth.service");
const { signUpValidSchema, loginValidSchema } = require("../validations/user.validation");

const AuthController = {

    async register(req, res){
        try{
            const {error} = signUpValidSchema.validate(req.body, {abortEarly: false});

            if (error){
                return res.status(400).json({message: error.details[0].message});
            }

            const user = await AuthService.createUser(req.body);
            return res.status(200).json(userDTO.toResponse(user))

        } catch(err){
            return res.status(400).json({"error": err.message})
        }
    },

    async authenticate(req, res){
        try{

            const {error} = loginValidSchema.validate(req.body, {abortEarly: false});
            if (error){
                return res.status(400).json({message: error.details[0].message});
            }
            const {user, accessToken} = await AuthService.authenticateUser(req.body.email, req.body.password);

            return res.status(200).json({
                accessToken: accessToken,
                user: userDTO.toResponse(user),
            })

        } catch(err){
            return res.status(400).json({error: err.message})
        }
    }
}

module.exports = AuthController