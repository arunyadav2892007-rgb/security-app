const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const { generateCertificatePdf } = require('../services/pdfService');

/**
 * GET /api/certificate/:id
 * Retrieve certificate record
 */
router.get('/:id', async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }
    res.json({ success: true, certificate: cert });
  } catch (err) {
    console.error('Error fetching certificate:', err);
    res.status(500).json({ success: false, message: 'Server error retrieving certificate' });
  }
});

/**
 * GET /api/certificate/:id/download
 * Generates and downloads official PDF certificate using PDFKit
 */
router.get('/:id/download', async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) {
      return res.status(404).json({ success: false, message: 'Certificate record not found' });
    }

    const frontendBaseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const certPayload = {
      certificateNumber: cert.certificateNumber,
      candidateName: cert.candidateName,
      candidateEmail: cert.candidateEmail,
      vehicleCategory: cert.vehicleCategory,
      scorePercentage: cert.scorePercentage,
      issueDate: cert.issueDate,
      validTill: cert.validTill,
      verificationUrl: `${frontendBaseUrl}/verify/${cert.certificateNumber}`
    };

    const pdfBuffer = await generateCertificatePdf(certPayload);

    const safeFilename = `ECCO_Certificate_${cert.certificateNumber}_${cert.candidateName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${safeFilename}"`,
      'Content-Length': pdfBuffer.length
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error('Error generating certificate PDF:', err);
    res.status(500).json({ success: false, message: 'Failed to generate certificate PDF' });
  }
});

/**
 * GET /api/certificate/verify/:certNumber
 * Public endpoint to verify certificate authenticity
 */
router.get('/verify/:certNumber', async (req, res) => {
  try {
    const { certNumber } = req.params;
    const cert = await Certificate.findOne({
      certificateNumber: certNumber.toUpperCase()
    });

    if (!cert) {
      return res.status(404).json({
        success: false,
        verified: false,
        message: 'No certificate found with this verification number.'
      });
    }

    const isExpired = new Date(cert.validTill) < new Date();

    res.json({
      success: true,
      verified: true,
      certificate: {
        certificateNumber: cert.certificateNumber,
        candidateName: cert.candidateName,
        vehicleCategory: cert.vehicleCategory,
        courseName: cert.courseName,
        scorePercentage: cert.scorePercentage,
        issueDate: cert.issueDate,
        validTill: cert.validTill,
        status: isExpired ? 'expired' : cert.status,
        issuingAuthority: cert.issuingAuthority,
        isExpired
      }
    });
  } catch (err) {
    console.error('Error verifying certificate:', err);
    res.status(500).json({ success: false, message: 'Server error during certificate verification' });
  }
});

module.exports = router;
