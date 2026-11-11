import React, { useState, useEffect, useCallback } from 'react';
import { 
  Clock, 
  Flag, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  HelpCircle,
  Send,
  RefreshCw,
  Server,
  Wifi
} from 'lucide-react';
import { api, getApiBaseUrl, setApiBaseUrl } from '../services/api';

export default function ExamPlayer({ candidateInfo, onExamCompleted, onCancel }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customServerUrl, setCustomServerUrl] = useState(() => getApiBaseUrl());
  const [isRetrying, setIsRetrying] = useState(false);
  const [testFeedback, setTestFeedback] = useState(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionIndex]: selectedOptionIndex }
  const [flagged, setFlagged] = useState({}); // { [questionIndex]: boolean }
  
  // 15-minute countdown timer (900 seconds)
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Load questions callback
  const loadQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setTestFeedback(null);
      const data = await api.getQuestions(15);
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
      } else {
        setError('No questions available in the question bank.');
      }
    } catch (err) {
      console.error('Failed to load questions:', err);
      setError('Failed to connect to the examination server. Please check your network.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load questions on mount
  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const handleSaveAndRetry = async () => {
    try {
      setIsRetrying(true);
      setTestFeedback(null);
      const cleaned = setApiBaseUrl(customServerUrl);
      setCustomServerUrl(cleaned);
      
      // Test health first
      const health = await api.checkHealth(cleaned);
      setTestFeedback({ ok: true, msg: `Server active (${health.database || 'ready'})! Loading questions...` });
      
      await loadQuestions();
    } catch (err) {
      setTestFeedback({ 
        ok: false, 
        msg: `Could not connect to ${customServerUrl}: ${err.message}. Ensure phone is on the same Wi-Fi as your PC.` 
      });
    } finally {
      setIsRetrying(false);
    }
  };

  // Timer countdown effect
  useEffect(() => {
    if (loading || isSubmitting || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, isSubmitting, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const handleToggleFlag = () => {
    setFlagged(prev => ({
      ...prev,
      [currentIndex]: !prev[currentIndex]
    }));
  };

  const handleAutoSubmit = () => {
    submitExam();
  };

  const submitExam = async () => {
    try {
      setIsSubmitting(true);
      setShowConfirmModal(false);

      const submissionPayload = {
        candidateName: candidateInfo.candidateName,
        candidateEmail: candidateInfo.candidateEmail,
        candidatePhone: candidateInfo.candidatePhone,
        vehicleCategory: candidateInfo.vehicleCategory,
        city: candidateInfo.city,
        timeTakenSeconds: (15 * 60) - timeLeft,
        answers: questions.map((q, idx) => ({
          questionId: q._id,
          selectedAnswerIndex: answers[idx] !== undefined ? answers[idx] : -1
        }))
      };

      const result = await api.submitExam(submissionPayload);
      onExamCompleted(result);
    } catch (err) {
      console.error('Exam submission error:', err);
      alert('Error submitting exam: ' + err.message);
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 border-4 border-teal-200 border-t-teal-700 rounded-full animate-spin mb-4"></div>
        <h3 className="text-lg font-bold text-slate-800">Preparing Your Examination...</h3>
        <p className="text-xs text-slate-500 mt-1">Randomizing 15 road safety questions across four domains</p>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 sm:p-6 text-center max-w-lg mx-auto">
        <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">Unable to Start Exam</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-md">{error}</p>

        {/* Server Endpoint Config Card */}
        <div className="mt-6 w-full p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-left space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Server className="w-4 h-4 text-teal-700" />
              Backend Server Endpoint
            </span>
            <span className="text-[10px] text-teal-700 font-mono bg-teal-50 px-2 py-0.5 rounded-md">
              Port 5000
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={customServerUrl}
              onChange={(e) => setCustomServerUrl(e.target.value)}
              placeholder="http://192.168.1.5:5000/api"
              className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl font-mono focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-100"
            />
            <button
              onClick={handleSaveAndRetry}
              disabled={isRetrying}
              className="px-4 py-2 text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white rounded-xl transition flex items-center gap-1.5 disabled:opacity-50 shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
              <span>{isRetrying ? 'Connecting...' : 'Save & Retry'}</span>
            </button>
          </div>

          {/* Quick Preset */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] text-slate-400">Computer IP:</span>
            <button
              onClick={() => setCustomServerUrl('http://192.168.1.5:5000/api')}
              className="text-[11px] font-semibold text-teal-700 hover:underline bg-teal-50 px-2 py-0.5 rounded-md"
            >
              http://192.168.1.5:5000/api
            </button>
          </div>

          {testFeedback && (
            <div className={`p-2.5 rounded-xl text-[11px] font-medium leading-relaxed ${
              testFeedback.ok 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}>
              {testFeedback.msg}
            </div>
          )}

          <p className="text-[11px] text-slate-400 leading-tight">
            💡 Ensure your mobile phone is connected to the same Wi-Fi router (<code>Airtel_Veeru Yadav 3</code>) and your backend server (<code>npm start</code>) is running.
          </p>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={loadQuestions}
            disabled={loading || isRetrying}
            className="px-5 py-2.5 rounded-xl bg-teal-700 text-white text-xs font-semibold hover:bg-teal-800 transition flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold transition"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="min-h-screen bg-slate-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Top Control Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-800 text-white flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">
                {candidateInfo.candidateName}
              </h2>
              <span className="text-[11px] text-teal-700 font-medium">
                {candidateInfo.vehicleCategory}
              </span>
            </div>
          </div>

          {/* Timer Display */}
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-bold text-sm ${
              timeLeft < 180 
                ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse' 
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              <Clock className="w-4 h-4 text-slate-500" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={() => setShowConfirmModal(true)}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Test</span>
            </button>
          </div>
        </div>

        {/* Main Exam Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left/Center: Question Card */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 relative">
              
              {/* Question metadata badge bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 font-bold text-xs">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-medium text-xs">
                    {currentQ.category}
                  </span>
                </div>

                <button
                  onClick={handleToggleFlag}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    flagged[currentIndex]
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <Flag className={`w-3.5 h-3.5 ${flagged[currentIndex] ? 'fill-amber-500 text-amber-600' : ''}`} />
                  <span>{flagged[currentIndex] ? 'Flagged' : 'Flag for Review'}</span>
                </button>
              </div>

              {/* Question text */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed mb-6">
                {currentQ.questionText}
              </h3>

              {/* Options list */}
              <div className="space-y-3">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = answers[currentIndex] === optIdx;
                  const optionLetters = ['A', 'B', 'C', 'D'];
                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`flex items-center gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition select-none ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/70 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition ${
                        isSelected
                          ? 'bg-teal-700 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {optionLetters[optIdx]}
                      </div>
                      <span className={`text-sm leading-relaxed ${isSelected ? 'font-semibold text-teal-950' : 'text-slate-700'}`}>
                        {option}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Nav Controls */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-8">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs shadow-xs transition"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowConfirmModal(true)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition"
                  >
                    <span>Review & Submit</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* Right Column: Question Navigator Palette */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              
              <h4 className="font-bold text-sm text-slate-900 mb-4 flex items-center justify-between">
                <span>Question Navigator</span>
                <span className="text-xs font-medium text-slate-500">
                  {answeredCount} of {questions.length} Answered
                </span>
              </h4>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 mb-6 overflow-hidden">
                <div 
                  className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                ></div>
              </div>

              {/* Number buttons grid */}
              <div className="grid grid-cols-5 gap-2.5">
                {questions.map((_, idx) => {
                  const isAnswered = answers[idx] !== undefined;
                  const isCurrent = currentIndex === idx;
                  const isFlagged = flagged[idx];

                  let buttonClass = 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-transparent';
                  
                  if (isCurrent) {
                    buttonClass = 'ring-2 ring-teal-600 ring-offset-2 bg-teal-700 text-white font-bold';
                  } else if (isAnswered) {
                    buttonClass = 'bg-emerald-100 border border-emerald-300 text-emerald-800 font-semibold';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative h-10 rounded-xl text-xs flex items-center justify-center transition border ${buttonClass}`}
                    >
                      <span>{idx + 1}</span>
                      {isFlagged && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-emerald-100 border border-emerald-300"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-slate-100 border border-slate-200"></div>
                  <span>Unanswered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-teal-700"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-amber-500"></div>
                  <span>Flagged</span>
                </div>
              </div>

            </div>

            {/* Helpline helper card */}
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-800 space-y-1">
              <span className="font-bold flex items-center gap-1 text-teal-900">
                <HelpCircle className="w-3.5 h-3.5" /> Need Assistance?
              </span>
              <p className="text-[11px] text-teal-700">
                Facing an issue during the test? Call our 24x7 helpdesk at <strong>+91-9975160881</strong>.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 text-center">
              Submit Road Safety Exam?
            </h3>

            <p className="text-xs text-slate-600 text-center mt-2">
              You have answered <strong>{answeredCount}</strong> of <strong>{questions.length}</strong> questions.
              {unansweredCount > 0 && (
                <span className="text-rose-600 block mt-1 font-semibold">
                  You have {unansweredCount} unanswered questions!
                </span>
              )}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-1/2 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition"
              >
                Back to Test
              </button>
              <button
                onClick={submitExam}
                disabled={isSubmitting}
                className="w-1/2 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Evaluating...' : 'Confirm Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
