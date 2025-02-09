const ProfileDAO = require("../daos/profile.dao");

class ProfileService {

    static async createProfile(userId, profile_data){
        
        try {

            if (ProfileDAO.checkEmailExists(userId)){
                throw new Error("User already has a profile");
            }

            const profile = await ProfileDAO.createProfile({
                user_id: userId,
                ...profile_data
            });

            return profile;

        } catch(err){
            throw new Error(err.message);
        }

    }

    static async updateProfile(userId, edits){
        try{

            if (!ProfileDAO.checkExistingProfile(userId)){
                throw new Error("User does not have a profile");
            }

            const updatedProfile = await ProfileDAO.updateProfile(userId, edits);

            return updatedProfile;

        } catch(err){
            throw new Error(err.message);
        }
    }

}

module.exports = ProfileService