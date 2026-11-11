# ECCO Road Safety Examination & Certification Web App

A full-stack, enterprise-grade certification portal built for **ECCO Safety Training Services** ([eccoroadsafety.com](https://eccoroadsafety.com)), featuring online MCQ assessments, automated evaluation, Razorpay ₹100 payment integration, and vector-grade PDF certificate generation with cryptographic QR verification.

---

## 🌟 Key Features

1. **Brand-Aligned Theming & Content**:
   - Styled after **Ecco Safety Training Services** with official teal (`#1a6c7a`) and gold palette, typography, company emblem, Gurugram center address, and 24x7 helpline (+91-9975160881).
   - Tagline: *"Believe in Safety First"* & *"Safety isn't expensive, it's Priceless. 🦺"*

2. **Accredited Road Safety Question Bank**:
   - 24+ curated real-world multiple-choice questions categorized across 4 high-priority domains:
     - **Defensive Driving Techniques** (SIPDE hazard perception, 3-second following distance, hydroplaning, night glare, tailgating mitigation)
     - **Traffic Signs & Regulations** (Motor Vehicles Act compliance, mandatory/warning signs, roundabout right-of-way, BAC limits)
     - **Vehicle Safety & Maintenance** (FLOWER pre-trip checks, tire tread depth, ABS warning indicators, seatbelt occupant physics)
     - **First Aid & Emergency Response** (The Trauma Golden Hour, Good Samaritan legal protection, PASS fire extinguisher technique, CPR ratios)

3. **Interactive MCQ Exam Interface**:
   - Real-time 15-minute countdown timer with auto-submit.
   - Question Navigator palette showing Answered, Current, Flagged, and Unanswered questions.
   - Auto-scoring with server-side answer verification (preventing devtools inspection).
   - Strict 70% passing threshold.

4. **Transparent Scoring & Review**:
   - Circular score gauge with Pass/Fail classification.
   - Detailed question-by-question review displaying candidate selection vs. correct answer with official safety rationales.
   - Zero-fee policy on failed attempts: candidates can retake the test at no cost.

5. **Razorpay Payment Gateway (₹100 INR)**:
   - ₹100 issuance fee charged strictly upon passing (&ge;70%).
   - Seamless checkout popup via Razorpay JS SDK (UPI, Google Pay, PhonePe, Cards, NetBanking).
   - Cryptographic HMAC-SHA256 signature verification.
   - Includes 1-Click Fast-Track Demo payment mode for instant local testing without live banking cards.

6. **Tamper-Evident PDF Certificate Generation**:
   - High-resolution landscape vector certificate created using **PDFKit**.
   - Dual teal and gold ornate safety borders, corner flourishes, and golden foil seal.
   - Embedded dynamic **QR code** linking directly to the online certificate verification endpoint.
   - One-click PDF download and native browser printing.

7. **Public Credential Verification Portal**:
   - Dedicated portal (`/verify/:certNumber`) where employers, traffic authorities, and insurers can instantly verify credential authenticity.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (NoSQL) with Mongoose
- **Payment Gateway**: Razorpay (Node.js SDK & Checkout JS)
- **Certificate Engine**: PDFKit & QRCode
- **Frontend**: React.js (Vite), Tailwind CSS v4, Lucide React icons, Canvas Confetti

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (running locally on `mongodb://localhost:27017` or MongoDB Atlas URI)

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```
*Backend runs on `http://localhost:5000`*

#### Environment Variables (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecco_road_safety
RAZORPAY_KEY_ID=rzp_test_eccoSafetyDemo123
RAZORPAY_KEY_SECRET=demoSecretKeyEccoSafety987
FRONTEND_URL=http://localhost:5173
CERTIFICATE_PRICE_INR=100
```
> **Note on Razorpay Keys**: Replace `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` with your real keys from your Razorpay Dashboard. When using demo keys, the system automatically enables simulated checkout so you can test end-to-end without blockers.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`*

### 3. Native Android App (Capacitor)
The project is configured with **Capacitor** to produce a native Android application.

```bash
cd frontend

# Build web assets and sync with native Android project:
npm run cap:build

# Open project in Android Studio to build APK or run on phone/emulator:
npm run cap:open
```
*Android Project Directory*: [`frontend/android`](file:///c:/security%20app/frontend/android)

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check & DB connection status |
| `GET` | `/api/quiz/questions?limit=15` | Fetch 15 sanitized exam questions |
| `POST` | `/api/quiz/submit` | Submit answers and receive score evaluation |
| `GET` | `/api/quiz/attempt/:id` | Fetch attempt details |
| `POST` | `/api/payment/create-order` | Create Razorpay order for ₹100 |
| `POST` | `/api/payment/verify` | Verify Razorpay payment signature & issue certificate |
| `POST` | `/api/payment/simulate-test-pay`| 1-click test payment trigger for demo/testing |
| `GET` | `/api/certificate/:id` | Fetch certificate record |
| `GET` | `/api/certificate/:id/download` | Stream official PDF certificate file |
| `GET` | `/api/certificate/verify/:certNumber` | Public verification lookup by Certificate ID |
| `GET` | `/api/stats` | Platform insights (total exams, certificates, revenue) |

---

## 📜 Official Contact & Accreditation
- **Academy**: Ecco Safety Training Services
- **Head Office**: 01 Badshahpur, Sector 68, Gurugram, Haryana - 122101
- **Helpline**: +91-9975160881
- **Website**: [eccoroadsafety.com](https://eccoroadsafety.com)
