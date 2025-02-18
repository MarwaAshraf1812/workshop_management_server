const jwt = require('jsonwebtoken');

const ROLES = {
  USER: 1,
  INSTRUCTOR: 2,
  MODERATOR: 3,
  ADMIN: 4
};

class Authorization {
  /**
   * Verifies the JWT token from the request header
   */
  static verifyToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: "No authentication token provided"
        });
      }

      const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : authHeader;

      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          console.log('Token verification error:', err.message);
          return res.status(403).json({
            success: false,
            message: "Invalid or expired token"
          });
        }
        
        req.user = decoded;
        next();
      });
    } catch (error) {
      console.error('Auth error:', error);
      return res.status(500).json({
        success: false,
        message: "Authentication error"
      });
    }
  }

  /**
   * Checks if user has required role(s)
   */
  static checkRoles(allowedRoles) {
    return (req, res, next) => {
      Authorization.verifyToken(req, res, () => {
        const userRole = req.user.role;
        
        if (!userRole) {
          return res.status(403).json({
            success: false,
            message: "User role not found in token"
          });
        }

        const hasPermission = allowedRoles.some(role => ROLES[userRole] >= ROLES[role]);
        
        if (!hasPermission) {
          return res.status(403).json({
            success: false,
            message: "You don't have permission to perform this action"
          });
        }

        next();
      });
    };
  }

  /**
   * Checks if user owns the resource or has admin rights
   */
  static checkOwnership(resourceIdField) {
    return (req, res, next) => {
      Authorization.verifyToken(req, res, () => {
        const userId = req.user.id;
        const resourceId = req.params[resourceIdField];
        const userRole = req.user.role;

        // Admins can access any resource
        if (userRole >= ROLES.ADMIN) {
          return next();
        }

        // Check if user owns the resource
        if (userId === resourceId) {
          return next();
        }

        return res.status(403).json({
          success: false,
          message: "You don't have permission to access this resource"
        });
      });
    };
  }

  /**
   * Combined check for both role and ownership
   */
  static checkRoleAndOwnership(allowedRoles, resourceIdField) {
    return (req, res, next) => {
      Authorization.verifyToken(req, res, () => {
        const userRole = req.user.role;
        const userId = req.user.id;
        const resourceId = req.params[resourceIdField];

        // Check role first
        const hasRole = allowedRoles.some(role => userRole >= ROLES[role]);
        if (!hasRole) {
          return res.status(403).json({
            success: false,
            message: "Insufficient permissions"
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
          message: "You don't have permission to access this resource"
        });
      });
    };
  }
}

module.exports = { Authorization, ROLES };