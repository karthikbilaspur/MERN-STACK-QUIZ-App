// server.js

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import connect from './database/conn.js';
import userRouter from './controllers/userController.js';
import quizRouter from './controllers/quizController.js';
import questionRouter from './controllers/questionController.js';
import auth from './controllers/authController.js';
import scoreRouter from './controllers/scoreController.js';
import route from './router/route.js';
import authenticate from './controllers/authController.js';

config();

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/users', userRouter);
app.use('/api/quizzes', quizRouter);
app.use('/api/questions', questionRouter);
app.use('/api/auth', auth.router);
app.use('/api/scores', scoreRouter);

// Protected routes
app.use(authenticate);
app.use('/api', route);

app.get('/', (req, res) => {
  try {
    res.json("Get Request")
  } catch (error) {
    res.json(error)
  }
});

const port = process.env.PORT || 8080;

connect().then(() => {
  app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`);
  });
}).catch(error => {
  console.log("Invalid Database Connection");
});