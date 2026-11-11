import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle, 
  XCircle, 
  Award, 
  CreditCard, 
  RotateCcw, 
  ShieldCheck, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Lock,
  Zap,
  HelpCircle
} from 'lucide-react';
import { api } from '../services/api';

export default function ExamResult({ examResult, onRetakeExam, onPaymentSuccess }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const {
    attemptId,
    candidateName,
    totalQuestions,
    correctCount,
    scorePercentage,
    passingPercentage,
    passed,
    answers
  } = examResult;

  // Trigger celebratory confetti on pass
  useEffect(() => {
    if (passed) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.warn('Confetti error:', e);
      }
    }
  }, [passed]);

  // Handle standard Razorpay payment checkout
  const handleRazorpayPayment = async () => {
    try {
      setIsProcessingPayment(true);
      setPaymentError(null);

      const orderData = await api.createPaymentOrder(attemptId);

      // If already paid
      if (orderData.alreadyPaid && orderData.certificateId) {
        onPaymentSuccess(orderData.certificateId);
        return;
      }

      // Check if Razorpay JS SDK is loaded
      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount, // in paise
        currency: orderData.currency || 'INR',
        name: 'Ecco Safety Training Services',
        description: 'Road Safety Certificate Issuance Fee',
        image: 'https://eccoroadsafety.com/wp-content/uploads/2020/12/cropped-final-company-logo-1.png',
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            const verificationPayload = {
              attemptId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            };

            const result = await api.verifyPayment(verificationPayload);
            if (result.success && result.certificateId) {
              onPaymentSuccess(result.certificateId);
            } else {
              setPaymentError('Payment verification failed. Please contact support.');
            }
          } catch (err) {
            setPaymentError(err.message || 'Error processing payment verification');
          } finally {
            setIsProcessingPayment(false);
          }
        },
        prefill: {
          name: candidateName,
          email: orderData.candidate?.email,
          contact: orderData.candidate?.phone
        },
        notes: {
          attemptId: attemptId
        },
        theme: {
          color: '#1a6c7a'
        },
        modal: {
          ondismiss: function () {
            setIsProcessingPayment(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        setPaymentError(response.error.description || 'Payment was unsuccessful');
        setIsProcessingPayment(false);
      });
      rzp.open();

    } catch (err) {
      console.error('Payment initialization error:', err);
      setPaymentError(err.message || 'Unable to open payment modal');
      setIsProcessingPayment(false);
    }
  };

  // Instant simulated 1-click test payment for fast local testing
  const handleFastTestPayment = async () => {
    try {
      setIsProcessingPayment(true);
      setPaymentError(null);
      const res = await api.simulateTestPayment(attemptId);
      if (res.success && res.certificateId) {
        onPaymentSuccess(res.certificateId);
      } else {
        setPaymentError('Fast payment failed');
      }
    } catch (err) {
      setPaymentError(err.message || 'Failed test payment');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Score Hero Card */}
        <div className={`relative rounded-3xl p-8 sm:p-10 border shadow-lg overflow-hidden ${
          passed 
            ? 'bg-gradient-to-br from-teal-900 via-slate-900 to-teal-950 text-white border-teal-800' 
            : 'bg-white text-slate-900 border-slate-200'
        }`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            
            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md">
                {passed ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span className="text-amber-300">Examination Passed</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                    <span className="text-rose-600">Requirement Not Met</span>
                  </>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {passed ? `Congratulations, ${candidateName}!` : `Result for ${candidateName}`}
              </h2>

              <p className={`text-xs sm:text-sm max-w-lg ${passed ? 'text-teal-200' : 'text-slate-600'}`}>
                {passed ? (
                  'You have demonstrated exceptional defensive driving competence and road safety knowledge compliant with National Motor Vehicles standards.'
                ) : (
                  `You scored ${scorePercentage}%. A minimum passing score of ${passingPercentage}% is mandatory to qualify for the official certificate.`
                )}
              </p>
            </div>

            {/* Circular Score Badge */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm min-w-[170px] text-center">
              <div className="text-4xl sm:text-5xl font-black font-mono">
                <span className={passed ? 'text-amber-300' : 'text-rose-600'}>
                  {scorePercentage}%
                </span>
              </div>
              <span className={`text-xs font-semibold mt-1 ${passed ? 'text-teal-300' : 'text-slate-500'}`}>
                {correctCount} / {totalQuestions} Correct
              </span>
              <span className={`inline-block mt-2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                passed ? 'bg-emerald-500 text-white' : 'bg-rose-100 text-rose-700'
              }`}>
                {passed ? 'QUALIFIED' : 'NOT QUALIFIED'}
              </span>
            </div>

          </div>
        </div>

        {/* Certificate Issuance & Razorpay Payment Banner (If Passed) */}
        {passed && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-100/50 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
              
              <div className="space-y-3 max-w-xl text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Official Certificate Ready for Issuance</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Pay ₹100 to Unlock & Download Your Certificate
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Your passing record is verified in our database. Complete the one-time registration and verification fee of ₹100 to generate your official, tamper-proof PDF certificate equipped with an authentic QR code.
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Instant PDF Download
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Online QR Verification
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    3 Years Official Validity
                  </span>
                </div>
              </div>

              {/* Action Buttons Box */}
              <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
                {paymentError && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center font-medium">
                    {paymentError}
                  </div>
                )}

                {/* Standard Razorpay Button */}
                <button
                  onClick={handleRazorpayPayment}
                  disabled={isProcessingPayment}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-700 via-teal-800 to-teal-900 hover:from-teal-800 hover:to-teal-950 shadow-lg shadow-teal-900/20 transition duration-200 disabled:opacity-50"
                >
                  <CreditCard className="w-4 h-4 text-amber-300" />
                  <span>
                    {isProcessingPayment ? 'Connecting Payment...' : 'Pay ₹100 via Razorpay'}
                  </span>
                </button>

                {/* Instant 1-Click Fast Test Pay Button */}
                <button
                  onClick={handleFastTestPayment}
                  disabled={isProcessingPayment}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition"
                  title="Fast-track demo payment without credit card"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>Instant Demo Pay (1-Click Test)</span>
                </button>

                <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400">
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>256-bit Encrypted SSL Checkout</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Retake Card (If Failed) */}
        {!passed && (
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-sm text-amber-900">Want to try again?</h4>
              <p className="text-xs text-amber-800 mt-0.5">
                No fee is charged for failed attempts. Review the correct answers below and retake the test.
              </p>
            </div>
            <button
              onClick={onRetakeExam}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Examination</span>
            </button>
          </div>
        )}

        {/* Detailed Question Review Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-base text-slate-900">Question-by-Question Review</h3>
              <p className="text-xs text-slate-500">Review your choices and official safety rationales</p>
            </div>
            <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              {correctCount} of {totalQuestions} answered correctly
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {answers.map((item, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition overflow-hidden ${
                    item.isCorrect
                      ? 'border-emerald-200 bg-emerald-50/20'
                      : 'border-rose-200 bg-rose-50/20'
                  }`}
                >
                  {/* Summary Bar */}
                  <div
                    onClick={() => toggleExpand(idx)}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-black/5 transition select-none"
                  >
                    <div className="flex items-center gap-3">
                      {item.isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                      <div>
                        <span className="text-xs font-bold text-slate-400 mr-2">Q{idx + 1}.</span>
                        <span className="text-xs font-semibold text-slate-800 line-clamp-1">
                          {item.questionText}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {item.isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="p-4 border-t border-slate-100 bg-white space-y-3 text-xs">
                      <p className="font-semibold text-slate-900">{item.questionText}</p>
                      
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <div className="text-slate-600">
                          <strong className="text-slate-800">Your Selection: </strong>
                          {item.selectedAnswerIndex !== -1 ? `Option ${String.fromCharCode(65 + item.selectedAnswerIndex)}` : 'Not Answered'}
                        </div>
                        <div className="text-emerald-700 font-semibold">
                          <strong>Official Correct Answer: </strong>
                          Option {String.fromCharCode(65 + item.correctAnswerIndex)}
                        </div>
                      </div>

                      {item.explanation && (
                        <div className="p-3 rounded-xl bg-teal-50/80 border border-teal-200 text-teal-900 leading-relaxed">
                          <strong className="font-bold text-teal-950 block mb-0.5">Safety Rationale:</strong>
                          {item.explanation}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
