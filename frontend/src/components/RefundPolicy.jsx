import React from 'react';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
        <header className="mb-10 pb-6 border-b border-slate-200">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Refund & Cancellation Policy</h1>
          <p className="text-slate-500 mt-2">Last updated: November 2026</p>
        </header>

        <section className="space-y-6 text-slate-700 leading-relaxed">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-amber-900 mb-2">Key Policy Summary</h2>
            <ul className="list-disc list-inside space-y-1 text-amber-800">
              <li><strong>No refunds</strong> after certificate is issued</li>
              <li>Failed/pending payments are auto-reversed by Razorpay</li>
              <li>Contact us for exceptional circumstances</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">1. Certification Fee</h2>
            <p>The ₹100 certification fee is charged <strong>only upon achieving a passing score (70% or higher)</strong> in the road safety examination. No fee is charged for attempting the exam.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">2. No Refund After Certificate Issuance</h2>
            <p>Once a certificate has been generated and issued (which happens immediately after successful payment), <strong>no refunds will be provided</strong>. The certificate represents a verified record of your competency and cannot be revoked or refunded.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">3. Failed or Pending Payments</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>If payment fails, no certificate is issued and no charge is made</li>
              <li>If payment is pending, Razorpay automatically resolves within 24-48 hours</li>
              <li>Failed transactions are auto-reversed to your original payment method</li>
              <li>No action required from you for failed/pending payments</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">4. Duplicate Payments</h2>
            <p>If you are charged twice for the same certificate due to a system error, contact us within 7 days with both transaction IDs. We will verify and initiate a refund for the duplicate charge within 5-7 business days.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">5. Technical Issues</h2>
            <p>If a technical error prevents certificate generation after successful payment, contact us immediately. We will resolve the issue and ensure your certificate is issued at no additional cost.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">6. Exceptional Circumstances</h2>
            <p>For circumstances not covered above (e.g., fraudulent transaction, identity theft), contact us at <strong>info@eccoroadsafety.com</strong> with details. Each case is reviewed individually.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">7. Cancellation</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You may cancel exam attempt anytime before submission - no charge</li>
              <li>Once submitted and passed, the certification process cannot be cancelled</li>
              <li>No cancellation possible after payment is initiated</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">8. Contact for Refund Queries</h2>
            <p>For any payment or refund related queries:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Email: info@eccoroadsafety.com</li>
              <li>Phone: +91-9975160881</li>
              <li>Address: 01 Badshahpur, Sector 68, Gurugram, Haryana - 122101</li>
            </ul>
            <p className="mt-2">Please include your name, exam date, and transaction ID for faster resolution.</p>
          </div>
        </section>
      </div>
    </div>
  );
}