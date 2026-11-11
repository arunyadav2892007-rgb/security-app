const express = require('express');
const router = express.Router();
const ExamAttempt = require('../models/ExamAttempt');
const Certificate = require('../models/Certificate');
const Payment = require('../models/Payment');
const { createRazorpayOrder, verifyPaymentSignature } = require('../services/razorpayService');

/**
 * POST /api/payment/create-order
 * Creates a Razorpay order for ₹100 INR (10000 paise)
 */
router.post('/create-order', async (req, res) => {
  try {
    const { attemptId } = req.body;
    if (!attemptId) {
      return res.status(400).json({ success: false, message: 'Attempt ID is required' });
    }

    const attempt = await ExamAttempt.findById(attemptId);
    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Exam attempt not found' });
    }

    if (!attempt.passed) {
      return res.status(400).json({
        success: false,
        message: 'Cannot issue certificate for failed exam. Candidate must score at least 70%.'
      });
    }

    if (attempt.paymentStatus === 'paid' && attempt.certificateId) {
      return res.json({
        success: true,
        alreadyPaid: true,
        certificateId: attempt.certificateId,
        certificateNumber: attempt.certificateNumber,
        message: 'Payment already completed for this attempt.'
      });
    }

    const priceInr = parseInt(process.env.CERTIFICATE_PRICE_INR, 10) || 100;
    const amountPaise = priceInr * 100; // 100 * 100 = 10000 paise

    const receipt = `rcpt_${attempt._id.toString().slice(-8)}`;
    const order = await createRazorpayOrder({
      amountPaise,
      receipt,
      notes: {
        attemptId: attempt._id.toString(),
        candidateName: attempt.candidateName,
        candidateEmail: attempt.candidateEmail
      }
    });

    attempt.razorpayOrderId = order.id;
    attempt.paymentStatus = 'pending';
    await attempt.save();

    // Create payment entry
    const payment = new Payment({
      attemptId: attempt._id,
      orderId: order.id,
      amount: amountPaise,
      currency: 'INR',
      status: 'created',
      candidateEmail: attempt.candidateEmail,
      candidateName: attempt.candidateName
    });
    await payment.save();

    res.json({
      success: true,
      orderId: order.id,
      amount: amountPaise,
      amountInr: priceInr,
      currency: 'INR',
      keyId: order.key_id,
      isDemo: order.isDemo || false,
      candidate: {
        name: attempt.candidateName,
        email: attempt.candidateEmail,
        phone: attempt.candidatePhone
      }
    });
  } catch (err) {
    console.error('Error creating payment order:', err);
    res.status(500).json({ success: false, message: 'Failed to create payment order' });
  }
});

/**
 * POST /api/payment/verify
 * Verifies Razorpay payment signature and issues official certificate
 */
router.post('/verify', async (req, res) => {
  try {
    const { attemptId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!attemptId || !razorpay_order_id || !razorpay_payment_id) {
      return res.status(400).json({ success: false, message: 'Missing required payment verification fields' });
    }

    const attempt = await ExamAttempt.findById(attemptId);
    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Exam attempt not found' });
    }

    // Verify signature
    const isValid = verifyPaymentSignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature
    });

    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature. Verification failed.' });
    }

    // Update payment record
    await Payment.findOneAndUpdate(
      { orderId: razorpay_order_id },
      {
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        status: 'captured'
      },
      { upsert: true }
    );

    // If certificate already exists, return it
    if (attempt.certificateId) {
      const existingCert = await Certificate.findById(attempt.certificateId);
      if (existingCert) {
        return res.json({
          success: true,
          certificateId: existingCert._id,
          certificateNumber: existingCert.certificateNumber,
          message: 'Certificate already issued'
        });
      }
    }

    // Generate unique Certificate Number: ECCO-RS-2026-XXXXX
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const certificateNumber = `ECCO-RS-2026-${randomDigits}`;

    const issueDate = new Date();
    const validTill = new Date(issueDate);
    validTill.setFullYear(validTill.getFullYear() + 3); // 3 years validity

    const frontendBaseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const verificationUrl = `${frontendBaseUrl}/verify/${certificateNumber}`;

    const certificate = new Certificate({
      certificateNumber,
      attemptId: attempt._id,
      candidateName: attempt.candidateName,
      candidateEmail: attempt.candidateEmail,
      candidatePhone: attempt.candidatePhone,
      vehicleCategory: attempt.vehicleCategory,
      scorePercentage: attempt.scorePercentage,
      issueDate,
      validTill,
      status: 'active',
      paymentDetails: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        amountInr: 100,
        paidAt: new Date()
      }
    });

    await certificate.save();

    // Update attempt
    attempt.paymentStatus = 'paid';
    attempt.razorpayPaymentId = razorpay_payment_id;
    attempt.certificateId = certificate._id;
    attempt.certificateNumber = certificate.certificateNumber;
    await attempt.save();

    res.json({
      success: true,
      message: 'Payment verified and certificate successfully generated!',
      certificateId: certificate._id,
      certificateNumber: certificate.certificateNumber,
      verificationUrl
    });
  } catch (err) {
    console.error('Error verifying payment:', err);
    res.status(500).json({ success: false, message: 'Server error processing payment verification' });
  }
});

/**
 * POST /api/payment/simulate-test-pay
 * Convenient mock payment for instant local testing without needing actual Razorpay cards
 */
router.post('/simulate-test-pay', async (req, res) => {
  try {
    const { attemptId } = req.body;
    if (!attemptId) {
      return res.status(400).json({ success: false, message: 'Attempt ID is required' });
    }

    const attempt = await ExamAttempt.findById(attemptId);
    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Exam attempt not found' });
    }

    if (!attempt.passed) {
      return res.status(400).json({ success: false, message: 'Candidate must pass exam before certificate issuance.' });
    }

    const mockOrderId = `order_sim_${Date.now()}`;
    const mockPaymentId = `pay_sim_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const mockSig = 'simulated_success_sig';

    // Call verify logic
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const certificateNumber = `ECCO-RS-2026-${randomDigits}`;

    const issueDate = new Date();
    const validTill = new Date(issueDate);
    validTill.setFullYear(validTill.getFullYear() + 3);

    const certificate = new Certificate({
      certificateNumber,
      attemptId: attempt._id,
      candidateName: attempt.candidateName,
      candidateEmail: attempt.candidateEmail,
      candidatePhone: attempt.candidatePhone,
      vehicleCategory: attempt.vehicleCategory,
      scorePercentage: attempt.scorePercentage,
      issueDate,
      validTill,
      status: 'active',
      paymentDetails: {
        razorpayOrderId: mockOrderId,
        razorpayPaymentId: mockPaymentId,
        amountInr: 100,
        paidAt: new Date()
      }
    });

    await certificate.save();

    attempt.paymentStatus = 'paid';
    attempt.razorpayOrderId = mockOrderId;
    attempt.razorpayPaymentId = mockPaymentId;
    attempt.certificateId = certificate._id;
    attempt.certificateNumber = certificate.certificateNumber;
    await attempt.save();

    const payment = new Payment({
      attemptId: attempt._id,
      orderId: mockOrderId,
      paymentId: mockPaymentId,
      signature: mockSig,
      amount: 10000,
      currency: 'INR',
      status: 'simulated',
      candidateEmail: attempt.candidateEmail,
      candidateName: attempt.candidateName
    });
    await payment.save();

    res.json({
      success: true,
      message: 'Simulated payment completed and certificate issued!',
      certificateId: certificate._id,
      certificateNumber: certificate.certificateNumber,
      isSimulated: true
    });
  } catch (err) {
    console.error('Error in simulated test pay:', err);
    res.status(500).json({ success: false, message: 'Error simulating payment' });
  }
});

module.exports = router;
