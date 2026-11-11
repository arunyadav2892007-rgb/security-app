const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const ExamAttempt = require('../models/ExamAttempt');

/**
 * GET /api/quiz/questions
 * Fetches randomized questions for the exam (excluding correct answers for security)
 */
router.get('/questions', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 15;
    
    // Sample random questions from DB
    const questions = await Question.aggregate([
      { $sample: { size: limit } }
    ]);

    if (!questions || questions.length === 0) {
      return res.status(404).json({ success: false, message: 'No questions found in question bank' });
    }

    // Sanitize: strip out correctAnswerIndex and explanation before sending to client
    const sanitizedQuestions = questions.map(q => ({
      _id: q._id,
      questionText: q.questionText,
      category: q.category,
      options: q.options,
      difficulty: q.difficulty
    }));

    res.json({
      success: true,
      count: sanitizedQuestions.length,
      questions: sanitizedQuestions
    });
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ success: false, message: 'Server error fetching questions' });
  }
});

/**
 * POST /api/quiz/submit
 * Submits candidate answers, computes score, stores attempt
 */
router.post('/submit', async (req, res) => {
  try {
    const {
      candidateName,
      candidateEmail,
      candidatePhone,
      vehicleCategory,
      city,
      answers,
      timeTakenSeconds
    } = req.body;

    if (!candidateName || !candidateEmail || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ success: false, message: 'Missing required exam submission fields' });
    }

    // Retrieve full questions from DB to evaluate server-side
    const questionIds = answers.map(a => a.questionId);
    const questionsFromDb = await Question.find({ _id: { $in: questionIds } });
    const questionMap = new Map();
    questionsFromDb.forEach(q => questionMap.set(q._id.toString(), q));

    let correctCount = 0;
    const evaluatedAnswers = answers.map(ans => {
      const q = questionMap.get(ans.questionId.toString());
      if (!q) {
        return {
          questionId: ans.questionId,
          questionText: 'Question not found',
          category: 'General',
          selectedAnswerIndex: ans.selectedAnswerIndex,
          correctAnswerIndex: -1,
          isCorrect: false,
          explanation: ''
        };
      }

      const isCorrect = ans.selectedAnswerIndex === q.correctAnswerIndex;
      if (isCorrect) correctCount++;

      return {
        questionId: q._id,
        questionText: q.questionText,
        category: q.category,
        selectedAnswerIndex: ans.selectedAnswerIndex,
        correctAnswerIndex: q.correctAnswerIndex,
        isCorrect: isCorrect,
        explanation: q.explanation
      };
    });

    const totalQuestions = answers.length;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
    const passingPercentage = 70;
    const passed = scorePercentage >= passingPercentage;

    const attempt = new ExamAttempt({
      candidateName: candidateName.trim(),
      candidateEmail: candidateEmail.trim(),
      candidatePhone: (candidatePhone || '').trim(),
      vehicleCategory: vehicleCategory || 'All Class of Vehicle (COV)',
      city: city || 'Delhi NCR',
      answers: evaluatedAnswers,
      totalQuestions,
      correctCount,
      scorePercentage,
      passingPercentage,
      passed,
      paymentStatus: 'unpaid',
      timeTakenSeconds: timeTakenSeconds || 0
    });

    await attempt.save();

    res.json({
      success: true,
      attemptId: attempt._id,
      candidateName: attempt.candidateName,
      totalQuestions,
      correctCount,
      scorePercentage,
      passingPercentage,
      passed,
      answers: evaluatedAnswers
    });
  } catch (err) {
    console.error('Error submitting exam:', err);
    res.status(500).json({ success: false, message: 'Error submitting exam answers' });
  }
});

/**
 * GET /api/quiz/attempt/:id
 * Retrieve details of a previous attempt
 */
router.get('/attempt/:id', async (req, res) => {
  try {
    const attempt = await ExamAttempt.findById(req.params.id);
    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Attempt not found' });
    }
    res.json({ success: true, attempt });
  } catch (err) {
    console.error('Error fetching attempt:', err);
    res.status(500).json({ success: false, message: 'Error fetching attempt details' });
  }
});

module.exports = router;
