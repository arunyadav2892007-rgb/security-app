import React, { useEffect, useState } from 'react';
import { BarChart3, Users, Award, IndianRupee, Percent, CheckCircle, Database, ShieldAlert, RefreshCw } from 'lucide-react';
import { api } from '../services/api';

export default function AdminOverview({ onVerifyCert }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.getStats();
      if (res.stats) {
        setStats(res.stats);
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-wider">
              <BarChart3 className="w-4 h-4" />
              <span>Real-Time Platform Insights</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              ECCO Examination & Certification Metrics
            </h1>
          </div>

          <button
            onClick={fetchStats}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Metrics</span>
          </button>
        </div>

        {/* 4 Stat Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Exams Attempted</span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 mt-4">
              {stats?.totalAttempts || 0}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Candidates nationwide</span>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Certificates Issued</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-emerald-700 mt-4">
              {stats?.totalCertificates || 0}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Verified credentials</span>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pass Rate</span>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Percent className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-teal-800 mt-4">
              {stats?.passRate || 0}%
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">&ge; 70% threshold required</span>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Certification Revenue</span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <IndianRupee className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-amber-700 mt-4">
              ₹{(stats?.totalRevenueInr || 0).toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">At ₹100 per certified driver</span>
          </div>

        </div>

        {/* System & Architecture Info */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900">System Architecture & Integrations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Database className="w-4 h-4 text-emerald-600" />
                <span>MongoDB (NoSQL)</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Connected on port 27017. Stores Question bank, ExamAttempts, Certificates, and Payment audit logs.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Award className="w-4 h-4 text-teal-600" />
                <span>PDFKit Vector Generator</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Generates high-resolution landscape certificates with dynamic cryptographic QR codes and official seal.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <IndianRupee className="w-4 h-4 text-amber-600" />
                <span>Razorpay Gateway</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Supports UPI, Cards, and NetBanking with HMAC-SHA256 signature verification and test-payment mode.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Certificates Table */}
        {stats?.recentCertificates && stats.recentCertificates.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900">Recently Issued Certificates</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="pb-3">Certificate ID</th>
                    <th className="pb-3">Candidate</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Score</th>
                    <th className="pb-3">Issue Date</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stats.recentCertificates.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition">
                      <td className="py-3 font-mono font-bold text-teal-700">{c.certificateNumber}</td>
                      <td className="py-3 font-semibold text-slate-800">{c.candidateName}</td>
                      <td className="py-3 text-slate-500">{c.vehicleCategory}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                          {c.scorePercentage}%
                        </span>
                      </td>
                      <td className="py-3 text-slate-500">
                        {new Date(c.issueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => onVerifyCert(c.certificateNumber)}
                          className="text-teal-700 hover:text-teal-900 font-bold underline"
                        >
                          Verify
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
