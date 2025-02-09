class ProfileDTO {
    static fromRequest(profileData){
        return {
            first_name: profileData.first_name,
            last_name: profileData.last_name,
        }
    }

    static toRequest(profileData){
        return {
            first_name: profileData.first_name,
            last_name: profileData.last_name,
        }
    }
}

module.exports = ProfileDTO