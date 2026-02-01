import PDFDocument from "pdfkit";
import fs from "fs";
import Certificate from "../models/Certificate.js";
import User from "../models/User.js";
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";

// ─── Color Palette ───────────────────────────────────────────────────────────
const COLORS = {
  navy:      "#1B2845",
  gold:      "#C9A227",
  goldLight: "#E8D48B",
  cream:     "#FAF7F0",
  gray:      "#6B7280",
  white:     "#FFFFFF",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Centered text helper — the ONLY way to reliably place text in PDFKit */
function centeredText(doc, text, y, fontSize, font, color, options = {}) {
  doc.save()
    .fontSize(fontSize)
    .font(font)
    .fillColor(color)
    .text(text, 0, y, {
      width: doc.page.width,
      align: "center",
      lineBreak: false,
      ...options,
    })
    .restore();
}

/** Draw a horizontal rule */
function drawRule(doc, x, y, width, color = COLORS.gold, thickness = 1) {
  doc.save()
    .strokeColor(color)
    .lineWidth(thickness)
    .moveTo(x, y)
    .lineTo(x + width, y)
    .stroke()
    .restore();
}

/** Draw a diamond shape at (cx, cy) */
function drawDiamond(doc, cx, cy, size, color) {
  doc.save()
    .fillColor(color)
    .moveTo(cx, cy - size)
    .lineTo(cx + size, cy)
    .lineTo(cx, cy + size)
    .lineTo(cx - size, cy)
    .closePath()
    .fill()
    .restore();
}

/** Draw outer + inner gold border frame */
function drawBorderFrame(doc, W, H) {
  const m = 28;       // outer margin
  const gap = 8;      // gap between outer and inner

  doc.save()
    .strokeColor(COLORS.gold)
    .lineWidth(2.5)
    .rect(m, m, W - m * 2, H - m * 2)
    .stroke();

  doc.strokeColor(COLORS.goldLight)
    .lineWidth(0.7)
    .rect(m + gap, m + gap, W - (m + gap) * 2, H - (m + gap) * 2)
    .stroke()
    .restore();

  // Corner diamonds
  const co = m + gap; // corner offset
  [
    { x: co, y: co },
    { x: W - co, y: co },
    { x: co, y: H - co },
    { x: W - co, y: H - co },
  ].forEach(({ x, y }) => drawDiamond(doc, x, y, 5, COLORS.gold));
}

/** Decorative divider: ──── ◆ ──── */
function drawDivider(doc, centerX, y, armLen, color, thickness = 1) {
  drawRule(doc, centerX - armLen - 6, y, armLen, color, thickness);
  drawDiamond(doc, centerX, y, 4, color);
  drawRule(doc, centerX + 6, y, armLen, color, thickness);
}

// ─── Main Certificate Layout ─────────────────────────────────────────────────

function buildCertificatePDF(doc, student, event) {
  const W = doc.page.width;   // 612
  const H = doc.page.height;  // 792
  const cx = W / 2;           // horizontal center

  // ── Cream background ──
  doc.save().fillColor(COLORS.cream).rect(0, 0, W, H).fill().restore();

  // ── Navy top banner ──
  const bannerH = 195;
  doc.save().fillColor(COLORS.navy).rect(0, 0, W, bannerH).fill().restore();
  // Gold accent line at banner bottom
  drawRule(doc, 50, bannerH, W - 100, COLORS.gold, 1.5);

  // ── Border (drawn after banner so it overlays correctly) ──
  drawBorderFrame(doc, W, H);

  // =========================================================================
  // BANNER TEXT — all inside the navy area
  // =========================================================================
  centeredText(doc, "THE ORGANIZING COMMITTEE PRESENTS", 52, 10, "Helvetica", COLORS.white, {
    characterSpacing: 2.5,
  });

  centeredText(doc, "CERTIFICATE", 78, 38, "Helvetica-Bold", COLORS.gold);

  centeredText(doc, "OF  PARTICIPATION", 125, 15, "Helvetica", COLORS.goldLight, {
    characterSpacing: 5,
  });

  // =========================================================================
  // BODY — below the banner
  // =========================================================================

  // Divider 1
  drawDivider(doc, cx, 230, 70, COLORS.gold, 1);

  // "This is to certify that"
  centeredText(doc, "This is to certify that", 262, 13, "Helvetica", COLORS.gray);

  // Student name (big)
  centeredText(doc, student.name, 300, 32, "Helvetica-Bold", COLORS.navy);

  // Underline beneath name
  drawRule(doc, cx - 100, 348, 200, COLORS.navy, 0.7);

  // "has successfully participated in"
  centeredText(doc, "has successfully participated in", 372, 13, "Helvetica", COLORS.gray);

  // Event title
  centeredText(doc, `"${event.title}"`, 410, 22, "Helvetica-Bold", COLORS.navy);

  // Divider 2
  drawDivider(doc, cx, 460, 70, COLORS.gold, 0.8);

  // =========================================================================
  // SIGNATURE SECTION
  // =========================================================================
  const sigLineY  = 580;            // where the actual line sits
  const leftSigX  = 110;
  const rightSigX = W - 110 - 160;  // mirror of left

  // Left signature
  doc.save()
    .fontSize(7.5)
    .font("Helvetica")
    .fillColor(COLORS.goldLight)
    .text("sign here", leftSigX, sigLineY - 14, { width: 160, align: "center", lineBreak: false })
    .restore();
  drawRule(doc, leftSigX, sigLineY, 160, COLORS.navy, 0.8);
  doc.save()
    .fontSize(9)
    .font("Helvetica-Bold")
    .fillColor(COLORS.navy)
    .text("Event Coordinator", leftSigX, sigLineY + 8, { width: 160, align: "center", lineBreak: false })
    .restore();

  // Right signature
  doc.save()
    .fontSize(7.5)
    .font("Helvetica")
    .fillColor(COLORS.goldLight)
    .text("sign here", rightSigX, sigLineY - 14, { width: 160, align: "center", lineBreak: false })
    .restore();
  drawRule(doc, rightSigX, sigLineY, 160, COLORS.navy, 0.8);
  doc.save()
    .fontSize(9)
    .font("Helvetica-Bold")
    .fillColor(COLORS.navy)
    .text("Program Director", rightSigX, sigLineY + 8, { width: 160, align: "center", lineBreak: false })
    .restore();

  // =========================================================================
  // DATE
  // =========================================================================
  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  centeredText(doc, `Date: ${dateStr}`, 620, 11, "Helvetica", COLORS.gray);

  // =========================================================================
  // FOOTER
  // =========================================================================
  centeredText(
    doc,
    "This certificate is issued for recognition purposes only.",
    H - 58,
    8,
    "Helvetica",
    COLORS.gray
  );
}

// ─── Route Handlers ─────────────────────────────────────────────────────────

export const generateCertificate = async (req, res) => {
  try {
    const { studentId, eventId } = req.body;

    const [student, event] = await Promise.all([
      User.findById(studentId),
      Event.findById(eventId),
    ]);

    if (!student || !event) {
      return res.status(404).json({ message: "Invalid data" });
    }

    const fileName = `cert-${student._id}-${event._id}.pdf`;
    const filePath = `uploads/${fileName}`;

    const doc = new PDFDocument({ size: "Letter" });
    doc.pipe(fs.createWriteStream(filePath));

    buildCertificatePDF(doc, student, event);

    doc.end();

    const cert = await Certificate.create({
      studentId,
      eventId,
      file: fileName,
      generatedBy: req.user.id,
    });

    res.status(201).json(cert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyCertificates = async (req, res) => {
  try {
    const approvedEvents = await Registration.find({
      studentId: req.user.id,
      status: "approved",
    }).select("eventId");

    const eventIds = approvedEvents.map((r) => r.eventId);

    const certs = await Certificate.find({
      studentId: req.user.id,
      eventId: { $in: eventIds },
    });

    res.json(certs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};