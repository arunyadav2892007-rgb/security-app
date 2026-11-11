const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  attemptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExamAttempt',
    required: true
  },
  candidateName: {
    type: String,
    required: true
  },
  candidateEmail: {
    type: String,
    required: true
  },
  candidatePhone: {
    type: String,
    required: true
  },
  vehicleCategory: {
    type: String,
    default: 'Defensive Driving & Road Safety (COV)'
  },
  courseName: {
    type: String,
    default: 'Defensive Driving & Road Safety Certification'
  },
  scorePercentage: {
    type: Number,
    required: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  validTill: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'revoked', 'expired'],
    default: 'active'
  },
  issuingAuthority: {
    type: String,
    default: 'Ecco Safety Training Services'
  },
  paymentDetails: {
    razorpayOrderId: String,
    razorpayPaymentId: String,
    amountInr: {
      type: Number,
      default: 100
    },
    paidAt: {
      type: Date,
      default: Date.now
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
