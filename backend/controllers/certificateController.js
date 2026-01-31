import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import Certificate from "../models/Certificate.js";
import User from "../models/User.js";
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
export const generateCertificate = async (req, res) => {
  try {
    const { studentId, eventId } = req.body;

    const student = await User.findById(studentId);
    const event = await Event.findById(eventId);

    if (!student || !event) {
      return res.status(404).json({ message: "Invalid data" });
    }

    const fileName = `cert-${student._id}-${event._id}.pdf`;
    const filePath = `uploads/${fileName}`;

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(26).text("CERTIFICATE OF PARTICIPATION", { align: "center" });
    doc.moveDown();

    doc.fontSize(16).text(
      `This is to certify that ${student.name}\n\nhas successfully participated in\n\n${event.title}`,
      { align: "center" }
    );

    doc.moveDown();
    doc.text(`Date: ${new Date().toDateString()}`, { align: "center" });

    doc.end();

    const cert = await Certificate.create({
      studentId,
      eventId,
      file: fileName,
      generatedBy: req.user.id
    });

    res.status(201).json(cert);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyCertificates = async (req, res) => {
  const approvedEvents = await Registration.find({
  studentId: req.user.id,
  status: "approved"
}).select("eventId");

const eventIds = approvedEvents.map(r => r.eventId);

const certs = await Certificate.find({
  studentId: req.user.id,
  eventId: { $in: eventIds }
});

  res.json(certs);
};
