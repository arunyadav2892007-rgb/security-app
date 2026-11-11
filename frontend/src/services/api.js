// API service client for ECCO Road Safety Academy

// Dynamically determine the backend endpoint:
// When running inside Capacitor native webview (capacitor:// or file://), relative /api won't resolve.
// We default to the computer's local network Wi-Fi IP (192.168.1.5:5000) or user-configured URL.
export const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const isCapacitorNative = window.Capacitor?.isNativePlatform?.() ||
                             window.location.protocol === 'capacitor:' ||
                             window.location.protocol === 'file:';
    if (isCapacitorNative) {
      const stored = localStorage.getItem('ecco_backend_url');
      return stored || 'http://192.168.1.5:5000/api';
    }
  }
  return '/api';
};

export const setApiBaseUrl = (url) => {
  if (typeof window !== 'undefined') {
    let clean = (url || '').trim();
    if (clean) {
      clean = clean.replace(/\/+$/, '');
      if (!clean.endsWith('/api')) {
        clean += '/api';
      }
      localStorage.setItem('ecco_backend_url', clean);
      return clean;
    }
  }
  return getApiBaseUrl();
};

export const api = {
  // Test server connectivity
  async checkHealth(targetUrl) {
    const base = targetUrl ? (targetUrl.replace(/\/+$/, '').endsWith('/api') ? targetUrl.replace(/\/+$/, '') : `${targetUrl.replace(/\/+$/, '')}/api`) : getApiBaseUrl();
    const endpoint = `${base}/health`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    try {
      const res = await fetch(endpoint, { signal: controller.signal });
      clearTimeout(timer);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      clearTimeout(timer);
      throw e;
    }
  },

  // Fetch randomized exam questions
  async getQuestions(limit = 15) {
    const res = await fetch(`${getApiBaseUrl()}/quiz/questions?limit=${limit}`);
    if (!res.ok) throw new Error('Failed to load questions');
    return res.json();
  },

  // Submit completed exam answers
  async submitExam(payload) {
    const res = await fetch(`${getApiBaseUrl()}/quiz/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to submit exam');
    }
    return res.json();
  },

  // Get specific attempt details
  async getAttempt(attemptId) {
    const res = await fetch(`${getApiBaseUrl()}/quiz/attempt/${attemptId}`);
    if (!res.ok) throw new Error('Failed to load attempt details');
    return res.json();
  },

  // Create Razorpay Order for ₹100
  async createPaymentOrder(attemptId) {
    const res = await fetch(`${getApiBaseUrl()}/payment/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ attemptId })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to create payment order');
    }
    return res.json();
  },

  // Verify payment signature
  async verifyPayment(verificationData) {
    const res = await fetch(`${getApiBaseUrl()}/payment/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(verificationData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Payment verification failed');
    }
    return res.json();
  },

  // Fast simulated 1-click test payment for evaluation/demo
  async simulateTestPayment(attemptId) {
    const res = await fetch(`${getApiBaseUrl()}/payment/simulate-test-pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ attemptId })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Simulated payment failed');
    }
    return res.json();
  },

  // Get Certificate data
  async getCertificate(certificateId) {
    const res = await fetch(`${getApiBaseUrl()}/certificate/${certificateId}`);
    if (!res.ok) throw new Error('Failed to load certificate');
    return res.json();
  },

  // Public Certificate Verification by Number (e.g. ECCO-RS-2026-XXXX)
  async verifyCertificate(certNumber) {
    const res = await fetch(`${getApiBaseUrl()}/certificate/verify/${encodeURIComponent(certNumber)}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Certificate verification failed');
    }
    return res.json();
  },

  // Platform analytics
  async getStats() {
    const res = await fetch(`${getApiBaseUrl()}/stats`);
    if (!res.ok) throw new Error('Failed to fetch platform stats');
    return res.json();
  },

  // Download URL
  getDownloadUrl(certificateId) {
    return `${getApiBaseUrl()}/certificate/${certificateId}/download`;
  }
};
