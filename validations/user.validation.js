const Joi = require("joi");

const signUpValidSchema = Joi.object({
    username: Joi.string().alphanum().min(1).max(45).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
})

const loginValidSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

module.exports = {signUpValidSchema, loginValidSchema}