const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Create question
router.post('/', async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).send(question);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().exec();
    res.send(questions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get question by ID
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).exec();
    if (!question) {
      return res.status(404).send('Question not found');
    }
    res.send(question);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update question
router.put('/:id', async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!question) {
      return res.status(404).send('Question not found');
    }
    res.send(question);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete question
router.delete('/:id', async (req, res) => {
  try {
    await Question.findByIdAndRemove(req.params.id);
    res.status(204).send('Question deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;