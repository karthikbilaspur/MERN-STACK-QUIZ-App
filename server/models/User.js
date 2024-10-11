const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
  scores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Score' }],
  roles: [{ type: String, enum: ['admin', 'moderator', 'user'] }]  
});

const User = mongoose.model('User', userSchema);

module.exports = User;