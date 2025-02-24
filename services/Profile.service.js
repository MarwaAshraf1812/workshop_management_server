const ProfileDAO = require("../daos/profile.dao");
const UserDAO = require("../daos/User.dao");

class ProfileService {

    static async createProfile(id, profile_data){
        
        try {

            if (! await ProfileDAO.checkExistingProfile(user.id)){
                throw new Error("User already has a profile");
            }

            const profile = await ProfileDAO.createProfile({
                user_id: id,
                ...profile_data
            });

            return profile;

        } catch(err){
            throw new Error(err.message);
        }

    }

    static async updateProfile(id, edits){
        try{

            if (!await ProfileDAO.checkExistingProfile(id)){
                throw new Error("User does not have a profile");
            }

            const updatedProfile = await ProfileDAO.updateProfile(id, edits);

            return updatedProfile;

        } catch(err){
            throw new Error(err.message);
        }
    }

    static async getProfile(id){
        try{
            const profile = await ProfileDAO.getProfile(id);
            return profile;
        }
        catch(err){
            throw new Error(err.message);
        }
    }

}

module.exports = ProfileService