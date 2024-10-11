// controller/controller.js

import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, { answers } from '../database/data.js';
import { ValidationError } from '../utils/errors.js';

/** Handle errors */
const handleError = (res, error) => {
  res.status(500).json({ error: error.message });
};

/** Get all questions */
export async function getQuestions(req, res) {
  try {
    let q = await Questions.find();
    if (q.length === 0) {
      await Questions.insertMany(questions.map((question, index) => ({ question, answer: answers[index] })));
      q = await Questions.find();
    }
    res.json(q);
  } catch (error) {
    handleError(res, error);
  }
}

/** Insert all questions */
export async function insertQuestions(req, res) {
  try {
    await Questions.insertMany(questions.map((question, index) => ({ question, answer: answers[index] })));
    res.json({ msg: "Questions inserted successfully" });
  } catch (error) {
    handleError(res, error);
  }
}

/** Delete all questions */
export async function dropQuestions(req, res) {
  try {
    await Questions.deleteMany();
    res.json({ msg: "Questions deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
}

/** Get all results */
export async function getResult(req, res) {
  try {
    const r = await Results.find();
    res.json(r);
  } catch (error) {
    handleError(res, error);
  }
}

/** Post result */
export async function storeResult(req, res) {
  try {
    const { username, result, attempts, points, achieved } = req.body;
    if (!username || !result) {
      throw new ValidationError("Data not provided");
    }
    const newResult = await Results.create({ username, result, attempts, points, achieved });
    res.json({ msg: "Result saved successfully", result: newResult });
  } catch (error) {
    handleError(res, error);
  }
}

/** Delete all results */
export async function dropResult(req, res) {
  try {
    await Results.deleteMany();
    res.json({ msg: "Results deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
}