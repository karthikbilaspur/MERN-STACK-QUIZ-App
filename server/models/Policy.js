// models/Policy.js
const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  rules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rule' }]
});

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;