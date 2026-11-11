import React, { useEffect, useState } from 'react';
import { 
  Download, 
  Printer, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  ExternalLink, 
  QrCode, 
  Calendar,
  CreditCard,
  User,
  ArrowLeft
} from 'lucide-react';
import { api } from '../services/api';

export default function CertificateView({ certificateId, onBackToHome, onVerifyClick }) {
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadCert() {
      try {
        setLoading(true);
        const res = await api.getCertificate(certificateId);
        if (res.certificate) {
          setCert(res.certificate);
        } else {
          setError('Certificate not found');
        }
      } catch (err) {
        console.error('Error loading certificate:', err);
        setError('Failed to load certificate record');
      } finally {
        setLoading(false);
      }
    }
    if (certificateId) {
      loadCert();
    }
  }, [certificateId]);

  const handleDownloadPdf = () => {
    if (!certificateId) return;
    const downloadUrl = api.getDownloadUrl(certificateId);
    window.open(downloadUrl, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const url = `${window.location.origin}?verify=${cert?.certificateNumber}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-700 rounded-full animate-spin mb-4"></div>
        <h3 className="text-base font-bold text-slate-800">Generating Official Certificate...</h3>
        <p className="text-xs text-slate-500 mt-1">Applying cryptographic verification seal and QR code</p>
      </div>
    );
  }

  if (error || !cert) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h3 className="text-lg font-bold text-slate-800">Certificate Unavailable</h3>
        <p className="text-xs text-slate-500 mt-1">{error || 'Could not find certificate details.'}</p>
        <button
          onClick={onBackToHome}
          className="mt-4 px-6 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold"
        >
          Return Home
        </button>
      </div>
    );
  }

  const issueDateFormatted = new Date(cert.issueDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const validTillFormatted = new Date(cert.validTill).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const verificationUrl = `${window.location.origin}?verify=${cert.certificateNumber}`;

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Celebration & Action Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Payment Verified (₹100)
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-600">ID: {cert.certificateNumber}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Your Official Certificate is Ready!
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Authorized by Ecco Safety Training Services, Gurugram.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleDownloadPdf}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs text-white bg-teal-700 hover:bg-teal-800 shadow-md shadow-teal-900/10 transition"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Certificate</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Certificate Display Canvas (Visual Reproduction) */}
        <div className="relative bg-[#fafbfa] rounded-3xl p-8 sm:p-14 shadow-2xl border-8 border-teal-800 text-slate-900 overflow-hidden">
          {/* Inner Golden Border */}
          <div className="border-2 border-amber-500/70 p-6 sm:p-10 relative rounded-xl">
            
            {/* Corner Decorative Dots */}
            <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-amber-500"></div>

            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-teal-800 text-amber-300 flex items-center justify-center mx-auto shadow-md">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <h1 className="text-xl sm:text-2xl font-black tracking-widest text-slate-900 uppercase">
                THE ECCO SAFETY TRAINING SERVICES
              </h1>
              <p className="text-[11px] font-bold text-teal-800 tracking-wider uppercase">
                Believe In Safety First • Accredited Road Safety Training Institute
              </p>
              
              <div className="flex items-center justify-center gap-3 py-2">
                <div className="h-0.5 w-24 bg-amber-400"></div>
                <div className="w-2.5 h-2.5 rotate-45 bg-amber-500"></div>
                <div className="h-0.5 w-24 bg-amber-400"></div>
              </div>

              <h2 className="text-xs font-extrabold text-amber-700 tracking-widest uppercase">
                CERTIFICATE OF PROFICIENCY
              </h2>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-wide uppercase">
                DEFENSIVE DRIVING & ROAD TRAFFIC SAFETY
              </h3>
            </div>

            {/* Candidate Presentation */}
            <div className="text-center my-6 space-y-2">
              <p className="text-xs text-slate-500 italic">This credential is unequivocally conferred upon</p>
              
              <div className="text-2xl sm:text-4xl font-extrabold text-teal-950 tracking-wider uppercase py-1 border-b-2 border-teal-700 inline-block px-8">
                {cert.candidateName}
              </div>

              <p className="text-xs text-slate-600 max-w-2xl mx-auto leading-relaxed pt-3">
                for successfully clearing the Comprehensive National Road Safety and Defensive Driving Competence Assessment with an exemplary score of <strong>{cert.scorePercentage}%</strong>. The candidate has proven mastery of SIPDE hazard perception, collision-avoidance techniques, Indian Motor Vehicles Act compliance, emergency response, and vehicle safety maintenance.
              </p>
            </div>

            {/* Meta Box: Category, Score, Cert No */}
            <div className="my-6 grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-center text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-medium">Assessment Score</span>
                <span className="font-bold text-emerald-700 text-sm">{cert.scorePercentage}% (PASSED)</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-medium">Training Category</span>
                <span className="font-bold text-slate-800 text-sm">{cert.vehicleCategory}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-medium">Certificate Number</span>
                <span className="font-bold text-teal-800 text-sm font-mono">{cert.certificateNumber}</span>
              </div>
            </div>

            {/* Footer Signatories & QR */}
            <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              
              {/* Left: QR Code info */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-white p-1 rounded-lg border border-slate-300 shadow-xs flex items-center justify-center">
                  <QrCode className="w-12 h-12 text-slate-900" />
                </div>
                <div className="text-[10px] text-slate-500">
                  <span className="font-bold text-slate-800 block">Tamper-Proof QR</span>
                  <span>Scan to verify digital record authenticity</span>
                </div>
              </div>

              {/* Center: Golden Seal */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-amber-500 bg-amber-50 flex flex-col items-center justify-center text-amber-800 shadow-xs">
                  <Award className="w-6 h-6 text-amber-600" />
                  <span className="text-[8px] font-black uppercase tracking-tighter">ECCO SEAL</span>
                </div>
                <span className="text-[9px] font-bold text-amber-800 mt-1 tracking-wider uppercase">
                  VERIFIED CREDENTIAL
                </span>
              </div>

              {/* Right: Signature */}
              <div className="text-center sm:text-right space-y-1">
                <div className="font-serif italic font-bold text-slate-800 text-base">
                  A. K. Sharma
                </div>
                <div className="w-36 h-0.5 bg-slate-400 ml-auto"></div>
                <div className="text-[11px] font-bold text-slate-900">Director of Safety Training</div>
                <div className="text-[10px] text-slate-500">Ecco Safety Training Services</div>
              </div>

            </div>

            {/* Footnote date */}
            <div className="mt-6 text-center text-[10px] text-slate-400">
              Issued On: {issueDateFormatted} • Valid Till: {validTillFormatted} • Head Office: 01 Badshahpur, Sector 68, Gurugram, HR
            </div>

          </div>
        </div>

        {/* Back navigation */}
        <div className="flex justify-between items-center text-xs text-slate-500 pt-2">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-teal-700 hover:text-teal-900 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={() => onVerifyClick(cert.certificateNumber)}
            className="inline-flex items-center gap-1.5 text-teal-700 hover:text-teal-900 font-semibold"
          >
            <span>Test Public Verification Link</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
