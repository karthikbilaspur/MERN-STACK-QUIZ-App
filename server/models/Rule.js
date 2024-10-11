// models/Rule.js
const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
  attribute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attribute'
  },
  operator: {
    type: String,
    enum: ['eq', 'neq', 'regex', 'range', 'inSet', 'notInSet']
  },
  value: {
    type: String
  },
  values: [{ type: String }]
});

const Rule = mongoose.model('Rule', ruleSchema);

module.exports = Rule;