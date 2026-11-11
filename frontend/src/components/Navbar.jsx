import React from 'react';
import { ShieldCheck, Award, CheckCircle2, Phone, Search, BarChart3, BookOpen, Server } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, onStartExam, onOpenServerSettings }) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top micro announcement bar */}
      <div className="bg-teal-900 text-teal-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>National Defensive Driving & Road Safety Assessment Portal</span>
            <span className="hidden sm:inline text-teal-300">•</span>
            <span className="hidden sm:inline text-teal-200">Govt. MV Act Aligned Certification</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <a href="tel:+919975160881" className="flex items-center gap-1 hover:text-white transition">
              <Phone className="w-3 h-3 text-amber-400" />
              <span>+91-9975160881</span>
            </a>
            <span className="text-teal-400">|</span>
            <span className="text-amber-300 font-semibold">Exam Fee: ₹100 (On Passing Only)</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <div 
            onClick={() => setCurrentView('home')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-700 to-teal-900 flex items-center justify-center text-white shadow-md shadow-teal-900/10 group-hover:scale-105 transition duration-200">
              <ShieldCheck className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">ECCO</span>
                <span className="text-teal-700 font-bold text-xl">ROAD SAFETY</span>
              </div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Believe in Safety First <span className="text-amber-500 font-semibold">🦺</span>
              </p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-slate-700">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-3 py-2 rounded-lg transition ${
                currentView === 'home'
                  ? 'bg-teal-50 text-teal-700 font-semibold'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setCurrentView('curriculum')}
              className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
                currentView === 'curriculum'
                  ? 'bg-teal-50 text-teal-700 font-semibold'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              Syllabus & Topics
            </button>

            <button
              onClick={() => setCurrentView('verify')}
              className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
                currentView === 'verify'
                  ? 'bg-teal-50 text-teal-700 font-semibold'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Search className="w-4 h-4 text-slate-400" />
              Verify Certificate
            </button>

            <button
              onClick={() => setCurrentView('admin')}
              className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
                currentView === 'admin'
                  ? 'bg-teal-50 text-teal-700 font-semibold'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-slate-400" />
              Portal Stats
            </button>
          </nav>

          {/* Action CTA Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenServerSettings}
              className="p-2 text-slate-500 hover:text-teal-700 hover:bg-slate-100 rounded-xl transition"
              title="Configure Backend Server"
            >
              <Server className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentView('verify')}
              className="md:hidden p-2 text-slate-600 hover:text-teal-700"
              title="Verify Certificate"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={onStartExam}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-teal-700 via-teal-800 to-teal-900 hover:from-teal-800 hover:to-teal-950 shadow-md shadow-teal-900/20 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Take MCQ Exam</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
