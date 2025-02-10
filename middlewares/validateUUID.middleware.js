const { validate: isUUID } = require('uuid');

/**
 * Middleware to validate UUID parameters in request.
 */
const validateUUIDMiddleware = (req, res, next) => {
  const { id, userId } = req.params;

  if (id && !isUUID(id)) {
    return res.status(400).json({ error: 'Invalid workshop ID format' });
  }

  if (userId && !isUUID(userId)) {
    return res.status(400).json({ error: 'Invalid user ID format' });
  }

  next();
};

module.exports = validateUUIDMiddleware;
