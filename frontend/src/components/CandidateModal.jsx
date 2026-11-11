import React, { useState } from 'react';
import { X, ShieldCheck, User, Mail, Phone, Car, MapPin, AlertCircle, ArrowRight } from 'lucide-react';

export default function CandidateModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    vehicleCategory: 'All Class of Vehicle (COV)',
    city: 'Delhi NCR'
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.candidateName.trim() || formData.candidateName.trim().length < 3) {
      errs.candidateName = 'Please enter your full legal name (minimum 3 characters)';
    }
    if (!formData.candidateEmail.trim() || !/\S+@\S+\.\S+/.test(formData.candidateEmail)) {
      errs.candidateEmail = 'Please provide a valid email address';
    }
    if (!formData.candidatePhone.trim() || formData.candidatePhone.trim().length < 10) {
      errs.candidatePhone = 'Please provide a valid 10-digit mobile number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white transition p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-800/80 border border-teal-700 flex items-center justify-center text-amber-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Candidate Registration</h3>
              <p className="text-xs text-teal-300">ECCO Road Safety Certification Examination</p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Important Notice */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
            <span>
              <strong>Note:</strong> Enter your name precisely as you want it to appear on your official Certificate of Completion.
            </span>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Legal Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="e.g. Vikram Sharma"
                value={formData.candidateName}
                onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition focus:outline-hidden focus:ring-2 ${
                  errors.candidateName 
                    ? 'border-rose-400 focus:ring-rose-200' 
                    : 'border-slate-300 focus:border-teal-600 focus:ring-teal-100'
                }`}
              />
            </div>
            {errors.candidateName && <p className="text-rose-600 text-[11px] mt-1">{errors.candidateName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                placeholder="e.g. vikram@example.com"
                value={formData.candidateEmail}
                onChange={(e) => setFormData({ ...formData, candidateEmail: e.target.value })}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition focus:outline-hidden focus:ring-2 ${
                  errors.candidateEmail 
                    ? 'border-rose-400 focus:ring-rose-200' 
                    : 'border-slate-300 focus:border-teal-600 focus:ring-teal-100'
                }`}
              />
            </div>
            {errors.candidateEmail && <p className="text-rose-600 text-[11px] mt-1">{errors.candidateEmail}</p>}
          </div>

          {/* Phone & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={formData.candidatePhone}
                  onChange={(e) => setFormData({ ...formData, candidatePhone: e.target.value })}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition focus:outline-hidden focus:ring-2 ${
                    errors.candidatePhone 
                      ? 'border-rose-400 focus:ring-rose-200' 
                      : 'border-slate-300 focus:border-teal-600 focus:ring-teal-100'
                  }`}
                />
              </div>
              {errors.candidatePhone && <p className="text-rose-600 text-[11px] mt-1">{errors.candidatePhone}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                City / Region
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="e.g. Gurugram / Delhi"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-teal-600 focus:outline-hidden focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </div>
          </div>

          {/* Vehicle Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Vehicle & Training Category
            </label>
            <div className="relative">
              <Car className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <select
                value={formData.vehicleCategory}
                onChange={(e) => setFormData({ ...formData, vehicleCategory: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:border-teal-600 focus:outline-hidden focus:ring-2 focus:ring-teal-100"
              >
                <option value="All Class of Vehicle (COV)">All Class of Vehicle (COV) - Universal</option>
                <option value="LMV - Light Motor Vehicle (Car/SUV)">LMV - Light Motor Vehicle (Car/SUV)</option>
                <option value="MCWG - Two Wheeler (Motorcycle)">MCWG - Two Wheeler (Motorcycle)</option>
                <option value="HMV/HTV - Heavy Commercial (Truck/Bus)">HMV/HTV - Heavy Commercial (Truck/Bus)</option>
                <option value="Defensive Driving Specialist">Defensive Driving Specialist</option>
              </select>
            </div>
          </div>

          {/* Fee & Exam Rules Summary */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="flex justify-between items-center text-slate-900 font-semibold">
              <span>Exam Format:</span>
              <span>15 MCQs (15 Minutes)</span>
            </div>
            <div className="flex justify-between items-center text-slate-900 font-semibold">
              <span>Passing Score:</span>
              <span className="text-teal-700">70% Required</span>
            </div>
            <div className="flex justify-between items-center text-slate-900 font-semibold">
              <span>Certificate Fee:</span>
              <span className="text-amber-700">₹100 (Billed only after passing)</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-2/3 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm transition shadow-md shadow-teal-900/10 flex items-center justify-center gap-2"
            >
              <span>Begin Examination</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
