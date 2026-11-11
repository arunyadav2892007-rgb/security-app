const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');

/**
 * Generates a high-quality landscape PDF certificate for ECCO Road Safety
 * @param {Object} certData - Certificate data object
 * @returns {Promise<Buffer>}
 */
async function generateCertificatePdf(certData) {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        layout: 'landscape',
        margins: { top: 30, bottom: 30, left: 30, right: 30 },
        info: {
          Title: `ECCO Road Safety Certificate - ${certData.candidateName}`,
          Author: 'Ecco Safety Training Services',
          Subject: 'Certificate of Road Safety & Defensive Driving Proficiency',
          Keywords: 'Road Safety, Defensive Driving, ECCO, Certificate, Driver Safety'
        }
      });

      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      const width = doc.page.width;   // ~841.89
      const height = doc.page.height; // ~595.28

      // 1. Background Fill (Subtle off-white luxury certificate paper)
      doc.rect(0, 0, width, height).fill('#fafbfa');

      // 2. Decorative Outer Border (Deep Teal)
      doc.rect(20, 20, width - 40, height - 40)
        .lineWidth(4)
        .strokeColor('#1a6c7a')
        .stroke();

      // 3. Inner Decorative Border (Gold / Bronze)
      doc.rect(28, 28, width - 56, height - 56)
        .lineWidth(1.5)
        .strokeColor('#c59b27')
        .stroke();

      // 4. Corner Ornaments (Teal & Gold geometric corner flourishes)
      const corners = [
        { x: 32, y: 32, dx: 1, dy: 1 },
        { x: width - 32, y: 32, dx: -1, dy: 1 },
        { x: 32, y: height - 32, dx: 1, dy: -1 },
        { x: width - 32, y: height - 32, dx: -1, dy: -1 }
      ];

      corners.forEach(c => {
        doc.save();
        doc.lineWidth(2).strokeColor('#1a6c7a');
        doc.moveTo(c.x, c.y).lineTo(c.x + c.dx * 28, c.y).stroke();
        doc.moveTo(c.x, c.y).lineTo(c.x, c.y + c.dy * 28).stroke();
        doc.circle(c.x + c.dx * 8, c.y + c.dy * 8, 3).fillColor('#c59b27').fill();
        doc.restore();
      });

      // 5. Header Ribbon / Accent Header
      // Safety Shield Emblem at top center
      const centerX = width / 2;
      const topY = 48;

      // Draw Safety Shield
      doc.save();
      doc.moveTo(centerX - 16, topY)
        .lineTo(centerX + 16, topY)
        .lineTo(centerX + 16, topY + 16)
        .quadraticCurveTo(centerX, topY + 32, centerX, topY + 34)
        .quadraticCurveTo(centerX, topY + 32, centerX - 16, topY + 16)
        .closePath()
        .fillColor('#1a6c7a')
        .fill();

      // Shield inner checkmark
      doc.lineWidth(2.5)
        .strokeColor('#ffffff')
        .moveTo(centerX - 7, topY + 14)
        .lineTo(centerX - 2, topY + 20)
        .lineTo(centerX + 8, topY + 10)
        .stroke();
      doc.restore();

      // Company Name
      doc.fillColor('#000f2b')
        .font('Helvetica-Bold')
        .fontSize(22)
        .text('THE ECCO SAFETY TRAINING SERVICES', 0, topY + 40, {
          align: 'center',
          characterSpacing: 1.5
        });

      // Tagline
      doc.fillColor('#1a6c7a')
        .font('Helvetica-Bold')
        .fontSize(10)
        .text('BELIEVE IN SAFETY FIRST  •  GOVT. RECOGNIZED ROAD SAFETY ACADEMY', 0, topY + 66, {
          align: 'center',
          characterSpacing: 1.2
        });

      // Horizontal Divider with golden star
      const dividerY = topY + 84;
      doc.lineWidth(0.8).strokeColor('#c59b27').moveTo(width / 2 - 180, dividerY).lineTo(width / 2 + 180, dividerY).stroke();
      doc.circle(width / 2, dividerY, 4).fillColor('#c59b27').fill();

      // Certificate Title
      doc.fillColor('#c59b27')
        .font('Helvetica-Bold')
        .fontSize(13)
        .text('CERTIFICATE OF PROFICIENCY', 0, dividerY + 12, {
          align: 'center',
          characterSpacing: 3
        });

      doc.fillColor('#0f172a')
        .font('Helvetica-Bold')
        .fontSize(17)
        .text('DEFENSIVE DRIVING & ROAD TRAFFIC SAFETY', 0, dividerY + 30, {
          align: 'center',
          characterSpacing: 1
        });

      // Recipient presentation line
      doc.fillColor('#475569')
        .font('Helvetica')
        .fontSize(11)
        .text('This credential is unequivocally conferred upon', 0, dividerY + 54, {
          align: 'center'
        });

      // Candidate Name (Prominent & Elegant)
      doc.fillColor('#000f2b')
        .font('Helvetica-Bold')
        .fontSize(25)
        .text(certData.candidateName.toUpperCase(), 0, dividerY + 70, {
          align: 'center',
          underline: false
        });

      // Name underline
      const nameWidth = doc.widthOfString(certData.candidateName.toUpperCase());
      const nameUnderlineX = (width - nameWidth) / 2 - 20;
      doc.lineWidth(1.2)
        .strokeColor('#1a6c7a')
        .moveTo(nameUnderlineX, dividerY + 98)
        .lineTo(nameUnderlineX + nameWidth + 40, dividerY + 98)
        .stroke();

      // Certificate Citation text
      const citationText = `for successfully clearing the Comprehensive National Road Safety and Defensive Driving Competence Assessment with an exemplary score of ${certData.scorePercentage}%. The candidate has proven mastery of SIPDE hazard perception, collision-avoidance techniques, Indian Motor Vehicles Act compliance, emergency response, and vehicle safety maintenance.`;

      doc.fillColor('#334155')
        .font('Helvetica')
        .fontSize(10)
        .text(citationText, width / 2 - 270, dividerY + 108, {
          width: 540,
          align: 'center',
          lineGap: 3
        });

      // Meta Box / Badges row: Score, Category, Cert Number
      const boxY = dividerY + 165;
      const boxW = 540;
      const boxX = (width - boxW) / 2;

      doc.rect(boxX, boxY, boxW, 40)
        .fillAndStroke('#f1f5f9', '#cbd5e1');

      doc.fillColor('#0f172a')
        .font('Helvetica-Bold')
        .fontSize(9.5)
        .text(`ASSESSMENT SCORE: ${certData.scorePercentage}%`, boxX + 15, boxY + 14);

      doc.text(`CATEGORY: ${certData.vehicleCategory || 'COV (All Vehicles)'}`, boxX + 180, boxY + 14);

      doc.fillColor('#1a6c7a')
        .text(`ID: ${certData.certificateNumber}`, boxX + 370, boxY + 14);

      // Generate Live QR Code Buffer
      const verificationUrl = certData.verificationUrl || `https://eccoroadsafety.com/verify/${certData.certificateNumber}`;
      const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
        margin: 1,
        width: 80,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      });
      const qrBuffer = Buffer.from(qrDataUrl.replace(/^data:image\/png;base64,/, ''), 'base64');

      // Place QR code on bottom-left
      const footerY = height - 128;
      doc.image(qrBuffer, 65, footerY, { width: 70, height: 70 });
      doc.fillColor('#64748b')
        .font('Helvetica')
        .fontSize(7.5)
        .text('Scan to verify authentic', 60, footerY + 72, { width: 80, align: 'center' });
      doc.text('digital credential record', 60, footerY + 81, { width: 80, align: 'center' });

      // Official Stamp / Golden Seal Graphic in bottom-center
      const sealCenterX = width / 2;
      const sealCenterY = footerY + 35;

      doc.save();
      doc.circle(sealCenterX, sealCenterY, 32)
        .lineWidth(2)
        .strokeColor('#c59b27')
        .fillAndStroke('#fef9c3', '#c59b27');
      doc.circle(sealCenterX, sealCenterY, 28)
        .lineWidth(0.8)
        .strokeColor('#c59b27')
        .stroke();

      doc.fillColor('#854d0e')
        .font('Helvetica-Bold')
        .fontSize(7)
        .text('ECCO SAFETY', sealCenterX - 28, sealCenterY - 14, { width: 56, align: 'center' })
        .text('★ ★ ★', sealCenterX - 28, sealCenterY - 4, { width: 56, align: 'center' })
        .text('SEAL OF EXCELLENCE', sealCenterX - 30, sealCenterY + 6, { width: 60, align: 'center' });
      doc.restore();

      // Signatories on bottom-right
      const sigRightX = width - 230;

      // Signature 1: Training Director
      doc.lineWidth(1).strokeColor('#475569')
        .moveTo(sigRightX, footerY + 45)
        .lineTo(sigRightX + 170, footerY + 45)
        .stroke();

      // Simulated cursive signature
      doc.fillColor('#1e293b')
        .font('Helvetica-Bold')
        .fontSize(10)
        .text('A. K. Sharma', sigRightX + 25, footerY + 28);

      doc.fillColor('#0f172a')
        .font('Helvetica-Bold')
        .fontSize(9)
        .text('Director of Safety Training', sigRightX, footerY + 50, { width: 170, align: 'center' });

      doc.fillColor('#64748b')
        .font('Helvetica')
        .fontSize(7.5)
        .text('Ecco Safety Training Services', sigRightX, footerY + 62, { width: 170, align: 'center' });

      // Dates & Authority Details bottom bar
      const issueDateStr = new Date(certData.issueDate || Date.now()).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      const validTillStr = new Date(certData.validTill || Date.now() + 3 * 365 * 24 * 3600 * 1000).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      doc.fillColor('#64748b')
        .font('Helvetica')
        .fontSize(8)
        .text(`Issued On: ${issueDateStr}  |  Valid Till: ${validTillStr}  |  Authority: ECCO Safety Training Services, Gurugram`, 0, height - 36, {
          align: 'center'
        });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { generateCertificatePdf };
