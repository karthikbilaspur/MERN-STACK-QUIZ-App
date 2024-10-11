// middleware/rbac.js
const asyncHandler = require('express-async-handler');

const checkRoles = (...allowedRoles) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      return res.status(401).send('Unauthorized');
    }

    const userRoles = req.user.roles;
    if (!userRoles.some(role => allowedRoles.includes(role))) {
      return res.status(403).send('Forbidden');
    }

    next();
  });
};

module.exports = checkRoles;