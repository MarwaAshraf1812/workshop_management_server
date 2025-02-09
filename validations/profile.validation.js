const Joi = require("joi");

const profileValidSchema = Joi.object({
    first_name: Joi.string().min(1).max(200),
    last_name: Joi.string().min(1).max(200),
})

const updateProfileValidSchema = Joi.object({
    first_name: Joi.string().min(1).max(200),
    last_name: Joi.string().min(1).max(200),
})

module.exports = {profileValidSchema, updateProfileValidSchema}