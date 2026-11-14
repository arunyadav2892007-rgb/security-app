import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
        <header className="mb-10 pb-6 border-b border-slate-200">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Privacy Policy</h1>
          <p className="text-slate-500 mt-2">Last updated: November 2026</p>
        </header>

        <section className="space-y-6 text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">1. Information We Collect</h2>
            <p>We collect the following personal information when you register for the examination:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Exam responses and results</li>
              <li>Payment transaction details (processed by Razorpay)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Generate and issue your road safety certificate</li>
              <li>Verify certificate authenticity upon request</li>
              <li>Send exam results and certificate via email</li>
              <li>Process payments securely through Razorpay</li>
              <li>Improve our examination content and platform</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">3. Data Storage & Security</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Data is stored on secure cloud servers (MongoDB Atlas)</li>
              <li>Payment data is handled exclusively by Razorpay (PCI-DSS compliant)</li>
              <li>We implement appropriate technical measures to protect your data</li>
              <li>Certificate data is retained for verification purposes</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">4. Data Sharing</h2>
            <p>We do not sell your personal information. We may share data only:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>With Razorpay for payment processing</li>
              <li>With cloud service providers for hosting</li>
              <li>When required by law or legal process</li>
              <li>For certificate verification (name, certificate number, issue date only)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">5. Your Rights</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion (subject to certificate verification needs)</li>
              <li>Object to processing for marketing</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">6. Cookies & Analytics</h2>
            <p>We use minimal cookies for session management. We do not use third-party tracking cookies or advertising networks.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">7. Children's Privacy</h2>
            <p>The Platform is not directed to children under 18. We do not knowingly collect data from minors.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">8. Changes to This Policy</h2>
            <p>We may update this policy. Changes will be posted on this page with an updated date.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">9. Contact</h2>
            <p>For privacy concerns or data requests:</p>
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