const Joi = require("joi");

const createProfileSchema = Joi.object({
    userId: Joi.string().required(),
    first_name: Joi.string().min(1).max(200),
    last_name: Joi.string().min(1).max(200),
})

module.exports = {createProfileSchema}