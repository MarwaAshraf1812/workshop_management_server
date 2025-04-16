const jwt = require("jsonwebtoken");

const ROLES = {
  STUDENT: 1,
  USER: 2,
  INSTRUCTOR: 3,
  MODERATOR: 4,
  ADMIN: 5,
};

const Authorization = {
  verifyToken: (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: "No authentication token provided",
        });
      }

      const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader;

      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: err.name === 'TokenExpiredError' ? "Token expired" : "Invalid token",
          });
        }

        req.user = decoded;
        next();
      });

    } catch (error) {
      console.error("Auth error:", error);
      return res.status(500).json({
        success: false,
        message: "Authentication error",
      });
    }
  },

  checkRoles: (allowedRoles) => (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const userRoleValue =
      typeof req.user.role === "string"
        ? ROLES[req.user.role.toUpperCase()]
        : req.user.role;

    if (!userRoleValue || !Object.values(ROLES).includes(userRoleValue)) {
      return res.status(403).json({
        success: false,
        message: "Invalid user role",
      });
    }

    const allowedRoleValues = allowedRoles.map((role) =>
      typeof role === "string" ? ROLES[role.toUpperCase()] : role
    );

    const hasPermission = allowedRoleValues.includes(userRoleValue);

    return hasPermission
      ? next()
      : res.status(403).json({ success: false, message: "Insufficient permissions" });
  },

  checkOwnership: (getResourceOwnerId) => (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "No authentication required",
      });
    }

    const userId = getResourceOwnerId(req);
    if (String(req.user.id) === String(userId) || req.user.role === ROLES.ADMIN) {
      return next();
    }
    return res.status(403).json({ success: false, message: "Access denied" });
  },

  checkRoleAndOwnership: (allowedRoles, resourceIdField) => {
    return (req, res, next) => {
      Authorization.verifyToken(req, res, () => {
        const userRoleValue = typeof req.user.role === "string"
          ? ROLES[req.user.role.toUpperCase()]
          : req.user.role;
        const userId = req.user.id;
        const resourceId = req.params[resourceIdField];

        const allowedRoleValues = allowedRoles.map((role) =>
          typeof role === "string" ? ROLES[role.toUpperCase()] : role
        );

        const hasRole = allowedRoleValues.includes(userRoleValue);

        if (userRoleValue === ROLES.ADMIN || (hasRole && userId === resourceId)) {
          return next();
        }

        return res.status(403).json({
          success: false,
          message: "You don't have permission to access this resource",
        });
      });
    };
  },
};

module.exports = { Authorization, ROLES };
