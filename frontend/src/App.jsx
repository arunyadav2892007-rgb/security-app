import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import SyllabusSection from './components/SyllabusSection';
import CandidateModal from './components/CandidateModal';
import ExamPlayer from './components/ExamPlayer';
import ExamResult from './components/ExamResult';
import CertificateView from './components/CertificateView';
import VerifyCertificate from './components/VerifyCertificate';
import AdminOverview from './components/AdminOverview';
import InstallAppBanner from './components/InstallAppBanner';
import ServerSettingsModal from './components/ServerSettingsModal';
import TermsConditions from './components/TermsConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import RefundPolicy from './components/RefundPolicy';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isServerModalOpen, setIsServerModalOpen] = useState(false);
  const [candidateInfo, setCandidateInfo] = useState(null);
  const [examResult, setExamResult] = useState(null);
  const [currentCertificateId, setCurrentCertificateId] = useState(null);
  const [verifyCertNumber, setVerifyCertNumber] = useState('');

  // Check URL query parameters on mount (e.g., if scanned from QR code ?verify=ECCO-RS-...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const certQuery = params.get('verify');
    if (certQuery) {
      setVerifyCertNumber(certQuery);
      setCurrentView('verify');
    }
    const actionQuery = params.get('action');
    if (actionQuery === 'exam') {
      setIsModalOpen(true);
    } else if (actionQuery === 'verify') {
      setCurrentView('verify');
    }
  }, []);

  const handleStartExamClick = () => {
    setIsModalOpen(true);
  };

  const handleCandidateSubmit = (info) => {
    setCandidateInfo(info);
    setIsModalOpen(false);
    setCurrentView('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExamCompleted = (result) => {
    setExamResult(result);
    setCurrentView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSuccess = (certificateId) => {
    setCurrentCertificateId(certificateId);
    setCurrentView('certificate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeExam = () => {
    setIsModalOpen(true);
  };

  const handleVerifyCertClick = (certNumber = '') => {
    setVerifyCertNumber(certNumber);
    setCurrentView('verify');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-teal-700 selection:text-white">
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onStartExam={handleStartExamClick}
        onOpenServerSettings={() => setIsServerModalOpen(true)}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroSection
              onStartExam={handleStartExamClick}
              onVerifyClick={() => handleVerifyCertClick('')}
            />
            <FeaturesSection onStartExam={handleStartExamClick} />
            <SyllabusSection onStartExam={handleStartExamClick} />
          </>
        )}

        {currentView === 'curriculum' && (
          <div className="pt-6">
            <SyllabusSection onStartExam={handleStartExamClick} />
          </div>
        )}

        {currentView === 'exam' && candidateInfo && (
          <ExamPlayer
            candidateInfo={candidateInfo}
            onExamCompleted={handleExamCompleted}
            onCancel={() => setCurrentView('home')}
          />
        )}

        {currentView === 'result' && examResult && (
          <ExamResult
            examResult={examResult}
            onRetakeExam={handleRetakeExam}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        {currentView === 'certificate' && currentCertificateId && (
          <CertificateView
            certificateId={currentCertificateId}
            onBackToHome={() => setCurrentView('home')}
            onVerifyClick={handleVerifyCertClick}
          />
        )}

        {currentView === 'verify' && (
          <VerifyCertificate
            initialCertNumber={verifyCertNumber}
          />
        )}

        {currentView === 'admin' && (
          <AdminOverview
            onVerifyCert={handleVerifyCertClick}
          />
        )}

        {currentView === 'terms' && <TermsConditions />}
        {currentView === 'privacy' && <PrivacyPolicy />}
        {currentView === 'refund' && <RefundPolicy />}
      </main>

      {/* Candidate Registration Modal */}
      <CandidateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCandidateSubmit}
      />

      {/* Backend Server Settings Modal */}
      <ServerSettingsModal
        isOpen={isServerModalOpen}
        onClose={() => setIsServerModalOpen(false)}
      />

      {/* Footer */}
      <Footer onNavigate={(view) => {
        if (view === 'exam') {
          handleStartExamClick();
        } else {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }} />

      {/* Floating PWA Mobile Install Banner */}
      <InstallAppBanner />
    </div>
  );
}
