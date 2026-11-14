import React from 'react';
import { ShieldCheck, Phone, MapPin, Mail, Globe, ExternalLink, Heart } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Upper footer highlight bar */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 py-8 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h4 className="text-xl font-bold text-white tracking-wide">
              "Safety isn't expensive, it's Priceless. 🦺"
            </h4>
            <p className="text-sm text-slate-400 mt-1">
              Join thousands of responsible drivers across India who have verified their road safety knowledge.
            </p>
          </div>
          <a
            href="tel:+919975160881"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition shadow-lg shadow-teal-900/30"
          >
            <Phone className="w-4 h-4 text-amber-300" />
            <span>Call 24x7 Helpline: +91-9975160881</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-800 flex items-center justify-center text-white">
                <ShieldCheck className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white">ECCO</span>
                <span className="text-teal-400 font-bold text-lg ml-1">SAFETY</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ecco Safety Training Services is a premier safety consulting & driver training organization dedicated to zero-fatality road transit, defensive driving excellence, and occupational safety.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Globe className="w-4 h-4 text-teal-400" />
              <a href="https://eccoroadsafety.com" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1">
                eccoroadsafety.com <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Training Programs */}
          <div>
            <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Training Modules
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-teal-300 cursor-pointer transition">Defensive Driving Training (SIPDE)</li>
              <li className="hover:text-teal-300 cursor-pointer transition">All Class of Vehicle (COV) Training</li>
              <li className="hover:text-teal-300 cursor-pointer transition">Road Safety Awareness & Motor Vehicles Act</li>
              <li className="hover:text-teal-300 cursor-pointer transition">Emergency First Aid & Trauma Golden Hour</li>
              <li className="hover:text-teal-300 cursor-pointer transition">Fire Fighting & Vehicle Fire Response</li>
              <li className="hover:text-teal-300 cursor-pointer transition">Commercial Driver Fatigue Management</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Online Services
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition">
                  Certification Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('exam')} className="hover:text-white transition">
                  Start Online MCQ Test
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('verify')} className="hover:text-white transition">
                  Verify Issued Certificate by ID
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('curriculum')} className="hover:text-white transition">
                  Exam Syllabus & Domains
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-white transition">
                  Platform Statistics
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-white transition">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-white transition">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('refund')} className="hover:text-white transition">
                  Refund & Cancellation Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-1">
            <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Registered Center
            </h5>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>01 Badshahpur, Sector 68, Gurugram, Haryana - 122101</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="tel:+919975160881" className="hover:text-white transition">+91-9975160881</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>info@eccoroadsafety.com</span>
              </li>
              <li className="pt-2">
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
                  <span className="font-semibold text-amber-400">Fixed Fee Policy:</span> ₹100 is charged strictly upon achieving a passing score (&ge;70%) via secure Razorpay checkout.
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Ecco Safety Training Services. All Rights Reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with excellence for safer Indian roads</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
