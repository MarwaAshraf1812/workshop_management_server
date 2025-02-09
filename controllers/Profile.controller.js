const ProfileDTO = require("../dtos/profile.dto");
const ProfileService = require("../services/Profile.service");
const { profileValidSchema, updateProfileValidSchema } = require("../validations/profile.validation");

class ProfileController {

    static async getProfile(req, res){

        try {
            const profile = await ProfileService.getProfile(req.params.email)
            return res.status(200).json(ProfileDTO.toResponse(profile))
        }
        catch (error) {
            return res.status(404).json({ message: error.message })
        }

    }
    
    static async createProfile(req, res){

        try{
            const {email} = req.params;
            const {error} = profileValidSchema.validate(req.body, {abortEarly: false});

            if (error){
                return res.status(400).json({error: error.details[0].message});
            }

            const profile = await ProfileService.createProfile(email, ProfileDTO.fromRequest(req.body));
            return res.status(201).json(ProfileDTO.toResponse(profile));
        }
        catch(err){
            return res.status(500).json({error: err.message});
        }

    }

    static async updateProfile(req, res){
        try{
            const {email} = req.params;
            
            const {error} = updateProfileValidSchema.validate(req.body, {abortEarly: false});
            if (error){
                return res.status(400).json({error: error.details[0].message});
            }
            
            const updatedProfile = await ProfileService.updateProfile(email, ProfileDTO.fromRequest(req.body));

            return res.status(200).json(ProfileDTO.toResponse(updatedProfile))
        }
        catch(err){
            return res.status(500).json({error: err.message});
        }
    }
}

module.exports = ProfileController