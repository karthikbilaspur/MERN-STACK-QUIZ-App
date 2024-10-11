// models/Attribute.js
const mongoose = require('mongoose');

const attributeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  values: [{ type: String }]
});

const Attribute = mongoose.model('Attribute', attributeSchema);

module.exports = Attribute;