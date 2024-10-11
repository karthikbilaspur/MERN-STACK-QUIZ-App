// models/Score.js
const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  },
  score: {
    type: Number,
    required: true
  }
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;