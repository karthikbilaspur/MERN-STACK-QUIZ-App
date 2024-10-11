// models/RolePermission.js
const mongoose = require('mongoose');

const rolePermissionSchema = new mongoose.Schema({
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  permission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission'
  }
});

const RolePermission = mongoose.model('RolePermission', rolePermissionSchema);

module.exports = RolePermission;