import React, { useState, useEffect } from 'react';
import { Search, ShieldCheck, CheckCircle2, XCircle, Award, Calendar, Car, Download, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function VerifyCertificate({ initialCertNumber }) {
  const [certNumber, setCertNumber] = useState(initialCertNumber || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialCertNumber) {
      setCertNumber(initialCertNumber);
      handleSearch(initialCertNumber);
    }
  }, [initialCertNumber]);

  const handleSearch = async (numberToSearch) => {
    const num = (numberToSearch || certNumber).trim();
    if (!num) return;

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const res = await api.verifyCertificate(num);
      if (res.verified && res.certificate) {
        setResult(res.certificate);
      } else {
        setError('Certificate not found.');
      }
    } catch (err) {
      setError('No authentic certificate found with this verification ID. Please verify the code.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch(certNumber);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Verification Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-teal-100 border border-teal-200 text-teal-800 flex items-center justify-center mx-auto shadow-xs">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Official Credential Verification
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Verify the authenticity and validity of any ECCO Road Safety and Defensive Driving Certificate issued by Ecco Safety Training Services.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Enter Certificate ID / Number
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="e.g. ECCO-RS-2026-89421"
                  value={certNumber}
                  onChange={(e) => setCertNumber(e.target.value.toUpperCase())}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-mono focus:border-teal-600 focus:outline-hidden focus:ring-2 focus:ring-teal-100 uppercase"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !certNumber.trim()}
                className="px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Verifying...' : 'Verify Now'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              The Certificate ID is printed at the bottom of the certificate card and encoded inside the official QR code.
            </p>
          </form>
        </div>

        {/* Verification Result Card */}
        {result && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 shadow-xl space-y-6 animate-in fade-in zoom-in-95">
            
            {/* Status Banner */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-emerald-800 uppercase tracking-wider">
                    Authentic & Valid Credential
                  </h3>
                  <span className="text-xs font-mono font-semibold text-slate-600">
                    ID: {result.certificateNumber}
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                {result.status}
              </span>
            </div>

            {/* Candidate Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Certified Candidate</span>
                <span className="font-extrabold text-slate-900 text-base">{result.candidateName}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Assessment Score</span>
                <span className="font-extrabold text-emerald-700 text-base">{result.scorePercentage}% (Passed)</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Course Curriculum</span>
                <span className="font-bold text-slate-800">{result.courseName}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Vehicle Category</span>
                <span className="font-bold text-slate-800">{result.vehicleCategory}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Issue Date</span>
                <span className="font-semibold text-slate-700">
                  {new Date(result.issueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Valid Until</span>
                <span className="font-semibold text-slate-700">
                  {new Date(result.validTill).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Issuing Authority Notice */}
            <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-800">
              <strong>Issuing Body: </strong>{result.issuingAuthority} • 01 Badshahpur, Sector 68, Gurugram, Haryana.
            </div>

          </div>
        )}

        {/* Error Notice */}
        {error && (
          <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200 flex items-start gap-4">
            <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-rose-900">Verification Failed</h4>
              <p className="text-xs text-rose-800 mt-1">{error}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
