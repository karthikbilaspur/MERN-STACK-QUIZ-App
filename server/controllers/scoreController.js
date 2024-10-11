// controllers/scoreController.js
const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// Create score
router.post('/', async (req, res) => {
  try {
    const score = new Score(req.body);
    await score.save();
    res.status(201).send(score);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get user scores
router.get('/user/:id', async (req, res) => {
  try {
    const scores = await Score.find({ user: req.params.id }).exec();
    res.send(scores);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update score
router.put('/:id', async (req, res) => {
  try {
    const score = await Score.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!score) {
      return res.status(404).send('Score not found');
    }
    res.send(score);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;