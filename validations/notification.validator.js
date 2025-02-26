const Joi = require("joi");

class NotificationValidator {
  static validateNotification(data) {
    const schema = Joi.object({
      userId: Joi.string().uuid().allow(null, ''),
      message: Joi.string().min(3).max(500).required(),
      type: Joi.string().valid("INFO", "ASSIGNMENT", "DEADLINE", "ANNOUNCEMENT", "FEEDBACK", "MATERIAL").default("ANNOUNCEMENT"),
    });

    return schema.validate(data);
  }
}

module.exports = NotificationValidator;
