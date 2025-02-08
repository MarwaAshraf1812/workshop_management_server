const Joi = require("joi");

const signUpSchema = Joi.object({
    username: Joi.string().alphanum().min(1).max(45).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
})

module.exports = {signUpSchema}