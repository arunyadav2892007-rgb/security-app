import React from 'react';

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
        <header className="mb-10 pb-6 border-b border-slate-200">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Terms & Conditions</h1>
          <p className="text-slate-500 mt-2">Last updated: November 2026</p>
        </header>

        <section className="space-y-6 text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">1. Acceptance of Terms</h2>
            <p>By accessing and using the ECCO Road Safety Academy platform ("Platform"), you agree to be bound by these Terms & Conditions ("Terms"). If you do not agree, please do not use the Platform.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">2. Service Description</h2>
            <p>The Platform provides online road safety examinations, certificate generation upon passing, and verification services. The examination consists of multiple-choice questions covering defensive driving, traffic rules, and road safety knowledge.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">3. User Obligations</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate personal information during registration</li>
              <li>Complete the examination independently without external assistance</li>
              <li>Not attempt to reverse-engineer, copy, or distribute exam questions</li>
              <li>Use the Platform only for lawful purposes</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">4. Examination & Certification</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Passing score is 70% or higher</li>
              <li>Certificates are issued upon successful completion and payment of ₹100</li>
              <li>Certificates are verifiable via unique certificate number</li>
              <li>ECCO reserves the right to revoke certificates obtained fraudulently</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">5. Payment & Fees</h2>
            <p>The certification fee is ₹100 (Indian Rupees One Hundred only), payable via Razorpay secure checkout. Payment is only charged upon achieving a passing score. No fee is charged for attempting the exam.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">6. Intellectual Property</h2>
            <p>All content, questions, certificates, logos, and trademarks are property of Ecco Safety Training Services. Unauthorized reproduction or distribution is prohibited.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">7. Limitation of Liability</h2>
            <p>The Platform is provided "as is" without warranties. ECCO is not liable for any indirect, incidental, or consequential damages arising from use or inability to use the service.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">8. Governing Law</h2>
            <p>These Terms are governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of courts in Gurugram, Haryana.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">9. Contact</h2>
            <p>For questions about these Terms, contact:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Email: info@eccoroadsafety.com</li>
              <li>Phone: +91-9975160881</li>
              <li>Address: 01 Badshahpur, Sector 68, Gurugram, Haryana - 122101</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}