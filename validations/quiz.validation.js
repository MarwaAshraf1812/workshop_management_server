const Joi = require("joi");

const quizSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100).required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least {#limit} characters long",
    "string.max": "Title cannot exceed {#limit} characters",
    "any.required": "Title is required",
  }),
  deadline: Joi.date().greater("now").required().messages({
    "date.base": "Deadline must be a valid date",
    "date.greater": "Deadline must be in the future",
    "any.required": "Deadline is required",
  }),
  workshop_id: Joi.string().uuid().required().messages({
    "string.base": "Workshop ID must be a string",
    "any.required": "Workshop ID is required",
  }),
  total_points: Joi.number().integer().min(0).required().messages({
    "number.base": "Total points must be a number",
    "number.integer": "Total points must be an integer",
    "number.min": "Total points must be at least {#limit}",
    "any.required": "Total points is required",
  }),

  quiz_link: Joi.string().uri().required().messages({
    "string.base": "Quiz link must be a string",
    "string.uri": "Quiz link must be a valid URL",
    "any.required": "Quiz link is required",
  }),
});

const validateQuiz = (data) => {
  return quizSchema.validate(data, { abortEarly: false });
};

module.exports = { validateQuiz };
