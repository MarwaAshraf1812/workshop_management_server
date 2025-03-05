const jwt = require("jsonwebtoken");

const ROLES = {
  USER: 1,
  INSTRUCTOR: 2,
  MODERATOR: 3,
  ADMIN: 4,
  STUDENT: 5,
};

const Authorization = {
  /**
   * Verifies the JWT token from the request header
   */
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
          console.log("Token verification error:", err.message);
          return res.status(403).json({
            success: false,
            message: "Invalid or expired token",
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

  /**
   * Checks if user has required role(s)
   */
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
        
    if (!userRoleValue) {
      return res.status(403).json({
        success: false,
        message: "Invalid user role",
      });
    }

    const hasPermission = Array.isArray(allowedRoles)
      ? allowedRoles.some(role => {
          const roleValue = typeof role === "string" 
            ? ROLES[role.toUpperCase()] 
            : role;
          return userRoleValue >= roleValue;
        })
      : userRoleValue >= (typeof allowedRoles === "string" 
          ? ROLES[allowedRoles.toUpperCase()] 
          : allowedRoles);
          
    if (hasPermission) {
      return next();
    }
    
    return res
      .status(403)
      .json({ success: false, message: "Insufficient permissions" });
  },

  /**
   * Checks if user owns the resource or has admin rights
   */
  checkOwnership: (getResourceOwnerId) => (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "No authentication required",
      });
    }

    const userId = getResourceOwnerId(req);
    if (String(req.user.id) === String(userId)) {
      return next();
    }
    return res.status(403).json({ success: false, message: "Access denied" });
  },

  /**
   * Combined check for both role and ownership
   */
  checkRoleAndOwnership: (allowedRoles, resourceIdField) => {
    return (req, res, next) => {
      Authorization.verifyToken(req, res, () => {
        const userRole = req.user.role;
        const userId = req.user.id;
        const resourceId = req.params[resourceIdField];

        // Check role first
        const hasRole = allowedRoles.some((role) => userRole >= ROLES[role]);
        if (!hasRole) {
          return res.status(403).json({
            success: false,
            message: "Insufficient permissions",
          });
        }

        // If user has admin role, allow access
        if (userRole >= ROLES.ADMIN) {
          return next();
        }

        // Check ownership
        if (userId === resourceId) {
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
