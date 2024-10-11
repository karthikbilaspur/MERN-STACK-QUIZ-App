// middleware/permission.js
const asyncHandler = require('express-async-handler');

const checkPermission = (permissionName) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      return res.status(401).send('Unauthorized');
    }

    const userRoles = req.user.roles;
    const permissions = await RolePermission.find({ role: { $in: userRoles } })
      .populate('permission')
      .exec();

    const hasPermission = permissions.some((permission) => permission.permission.name === permissionName);
    if (!hasPermission) {
      return res.status(403).send('Forbidden');
    }

    next();
  });
};

module.exports = checkPermission;