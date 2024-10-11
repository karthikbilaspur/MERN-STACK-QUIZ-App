// controllers/authController.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register user with role
router.post('/register', async (req, res) => {
  try {
    const user = new User({ ...req.body, roles: ['user'] });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h'
    });
    res.status(201).send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h'
    });
    res.send({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});