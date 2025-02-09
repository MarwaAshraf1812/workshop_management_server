class userDTO {
    static fromRequest(userData){
        return {
            username: userData.username,
            email: userData.email,
            password: userData.password
        };
    }

    static toResponse(userData){
        return {
            username: userData.username,
            email: userData.email,
            role: userData.role
        };
    }
}

module.exports = userDTO;