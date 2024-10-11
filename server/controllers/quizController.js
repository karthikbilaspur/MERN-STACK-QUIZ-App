const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Create quiz
router.post('/', async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).send(quiz);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find().exec();
    res.send(quizzes);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).exec();
    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }
    res.send(quiz);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update quiz
router.put('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }
    res.send(quiz);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete quiz
router.delete('/:id', async (req, res) => {
  try {
    await Quiz.findByIdAndRemove(req.params.id);
    res.status(204).send('Quiz deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;