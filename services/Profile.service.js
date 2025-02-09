const ProfileDAO = require("../daos/profile.dao");
const UserDAO = require("../daos/User.dao");

class ProfileService {

    static async createProfile(email, profile_data){
        
        try {

            if (! await UserDAO.checkEmailExists(email)){
                throw new Error("Email does not exist");
            }

            const user = await UserDAO.getUserByEmail(email);

            if (! await ProfileDAO.checkEmailExists(user.id)){
                throw new Error("User already has a profile");
            }

            const profile = await ProfileDAO.createProfile({
                user_id: user.id,
                ...profile_data
            });

            return profile;

        } catch(err){
            throw new Error(err.message);
        }

    }

    static async updateProfile(email, edits){
        try{
            if (!await UserDAO.checkEmailExists(email)){
                throw new Error("Email does not exist");
            }

            const user = await UserDAO.getUserByEmail(email);

            if (!await ProfileDAO.checkExistingProfile(user.id)){
                throw new Error("User does not have a profile");
            }

            const updatedProfile = await ProfileDAO.updateProfile(user.id, edits);

            return updatedProfile;

        } catch(err){
            throw new Error(err.message);
        }
    }

    static async getProfile(email){
        try{
            const profile = await ProfileDAO.getUserProfileUsingEmail(email);
            return profile;
        }
        catch(err){
            throw new Error(err.message);
        }
    }

}

module.exports = ProfileService