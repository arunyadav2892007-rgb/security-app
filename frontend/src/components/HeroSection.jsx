import React from 'react';
import { ShieldCheck, Award, ArrowRight, CheckCircle2, QrCode, FileText, Zap, Star } from 'lucide-react';

export default function HeroSection({ onStartExam, onVerifyClick }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-900 via-slate-900 to-slate-950 text-white py-16 lg:py-24">
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              Official Examination Portal • ECCO Road Safety
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Believe In <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-teal-300">Safety First</span>.
              <br />
              Certify Your Skills.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Take the accredited Road Safety & Defensive Driving Competency Exam. Test your mastery of hazard prediction, traffic regulations, emergency first aid, and vehicle maintenance.
            </p>

            {/* Value bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>15 Multiple-Choice Questions (MCQ)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>70% Passing Threshold Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pay ₹100 Only Upon Successfully Passing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant Tamper-Proof PDF with QR Code</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onStartExam}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base text-slate-900 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-xl shadow-amber-400/20 hover:shadow-2xl transition duration-200 transform hover:-translate-y-0.5"
              >
                <Award className="w-5 h-5 text-slate-950" />
                <span>Start MCQ Exam Now</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={onVerifyClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition"
              >
                <QrCode className="w-4 h-4 text-teal-400" />
                <span>Verify a Certificate</span>
              </button>
            </div>

            {/* Credibility metric stats */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-slate-400 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-white">4.9/5 Rating</span>
              </div>
              <div>
                <span className="font-bold text-white">15,000+</span> Drivers Trained
              </div>
              <div>
                <span className="font-bold text-white">100% Secure</span> via Razorpay
              </div>
            </div>
          </div>

          {/* Right Column: Visual Certificate Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Glow backdrop */}
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-amber-500 rounded-2xl blur-lg opacity-30 animate-pulse-subtle"></div>
              
              {/* Certificate preview card */}
              <div className="relative bg-white text-slate-900 rounded-xl p-6 shadow-2xl border-4 border-amber-200/50">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-teal-700" />
                    <div>
                      <div className="font-bold text-xs text-slate-900 tracking-wider">ECCO ROAD SAFETY</div>
                      <div className="text-[10px] text-teal-700 font-medium">CERTIFICATE OF PROFICIENCY</div>
                    </div>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    VERIFIED
                  </div>
                </div>

                <div className="text-center py-2 space-y-1">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">Proudly Conferred To</p>
                  <p className="text-lg font-bold text-slate-900 tracking-wide">VIKRAM S. CHAUHAN</p>
                  <p className="text-[11px] text-slate-600 line-clamp-2 px-2">
                    For successfully mastering Defensive Driving (SIPDE), Motor Vehicles Act standards, and Emergency First Aid protocols.
                  </p>
                </div>

                {/* Score & Cert No */}
                <div className="mt-4 grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                  <div>
                    <span className="block text-[9px] text-slate-400 font-medium">SCORE</span>
                    <span className="text-xs font-bold text-emerald-600">93% PASS</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-400 font-medium">FEE</span>
                    <span className="text-xs font-bold text-slate-800">₹100 PAID</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-400 font-medium">QR CODE</span>
                    <span className="text-xs font-bold text-teal-700">INCLUDED</span>
                  </div>
                </div>

                {/* Footer preview */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span>ID: ECCO-RS-2026-89421</span>
                  <span className="text-teal-700 font-semibold">Director: A. K. Sharma</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
