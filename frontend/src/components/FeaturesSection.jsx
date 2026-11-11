import React from 'react';
import { 
  ClipboardCheck, 
  CreditCard, 
  FileCheck, 
  ShieldAlert, 
  Car, 
  Flame, 
  HeartPulse, 
  Clock, 
  CheckCircle,
  QrCode
} from 'lucide-react';

export default function FeaturesSection({ onStartExam }) {
  const steps = [
    {
      num: '01',
      title: 'Enter Candidate Profile',
      desc: 'Fill your full legal name, phone, email, and vehicle class. Your name will be permanently inscribed on your certificate.',
      icon: ClipboardCheck,
      color: 'text-teal-600 bg-teal-50'
    },
    {
      num: '02',
      title: 'Solve 15 Road Safety MCQs',
      desc: 'Answer randomized real-life road hazard scenarios, traffic signs, defensive maneuvers, and emergency response questions.',
      icon: Clock,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      num: '03',
      title: 'Achieve 70% or Higher',
      desc: 'Instant server evaluation with detailed explanations for each question. You only qualify for certification upon achieving &ge;70%.',
      icon: CheckCircle,
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      num: '04',
      title: 'Pay ₹100 via Razorpay',
      desc: 'Complete the government-standard issuance fee of ₹100 securely using UPI, Credit/Debit Cards, or NetBanking.',
      icon: CreditCard,
      color: 'text-amber-600 bg-amber-50'
    },
    {
      num: '05',
      title: 'Download Verified Certificate',
      desc: 'Get an immediate vector-quality PDF certificate equipped with an encrypted QR verification link and official safety seal.',
      icon: FileCheck,
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Simple 5-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            How the ECCO Certification Works
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            No long waiting periods. Complete your examination online from any mobile or desktop device and download your credential immediately.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="relative bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-teal-500/50 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-slate-400 group-hover:text-teal-700 transition">
                      STEP {step.num}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${step.color} shadow-xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-teal-800 transition">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Features Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 text-white p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-700/60 flex items-center justify-center text-amber-300 shrink-0">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white mb-1">Publicly Verifiable</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every certificate carries a cryptographic Certificate ID and QR code verifiable by employers, insurance agencies, and traffic authorities worldwide.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-700/60 flex items-center justify-center text-amber-300 shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white mb-1">No Risk • Pay on Passing</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  If you do not achieve the passing score of 70%, you pay ₹0. You can review your mistakes and re-attempt the examination anytime without penalty.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-700/60 flex items-center justify-center text-amber-300 shrink-0">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white mb-1">Razorpay Protected</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Fast, encrypted transactions via Razorpay supporting Google Pay, PhonePe, Paytm, BHIM UPI, Cards, and NetBanking with instant receipt delivery.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
