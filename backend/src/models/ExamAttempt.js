const mongoose = require('mongoose');

const answerRecordSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  questionText: String,
  category: String,
  selectedAnswerIndex: Number,
  correctAnswerIndex: Number,
  isCorrect: Boolean,
  explanation: String
}, { _id: false });

const examAttemptSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true,
    trim: true
  },
  candidateEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  candidatePhone: {
    type: String,
    required: true,
    trim: true
  },
  vehicleCategory: {
    type: String,
    default: 'All Class of Vehicle (COV)'
  },
  city: {
    type: String,
    default: 'Delhi NCR'
  },
  answers: [answerRecordSchema],
  totalQuestions: {
    type: Number,
    required: true
  },
  correctCount: {
    type: Number,
    required: true
  },
  scorePercentage: {
    type: Number,
    required: true
  },
  passingPercentage: {
    type: Number,
    default: 70
  },
  passed: {
    type: Boolean,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'pending', 'paid', 'failed'],
    default: 'unpaid'
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  certificateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Certificate'
  },
  certificateNumber: String,
  timeTakenSeconds: Number
}, { timestamps: true });

module.exports = mongoose.model('ExamAttempt', examAttemptSchema);
