const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  attemptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExamAttempt',
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  paymentId: {
    type: String
  },
  signature: {
    type: String
  },
  amount: {
    type: Number,
    required: true,
    default: 10000 // 100 INR in paise
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['created', 'captured', 'failed', 'simulated'],
    default: 'created'
  },
  candidateEmail: String,
  candidateName: String
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
