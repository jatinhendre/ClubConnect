import User from "../models/User.js";
import Club from "../models/Club.js";
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import Certificate from "../models/Certificate.js";

export const adminStats = async (req, res) => {
  try {
    const students = await User.countDocuments({ role: "student" });
    const clubs = await Club.countDocuments();
    const events = await Event.countDocuments();
    const registrations = await Registration.countDocuments();

    res.json({
      students,
      clubs,
      events,
      registrations
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const studentStats = async (req, res) => {
  try {

    // Get detailed registrations with event details
    const registrations = await Registration.find({
      studentId: req.user.id
    }).populate("eventId", "title eventDate");

    // Get detailed club memberships
    const clubs = await Club.find({
      members: req.user.id
    }).select("clubName description");

    const certificates = await Certificate.countDocuments({
      studentId: req.user.id
    });

    res.json({
      registrationsCount: registrations.length,
      registrations, // Send the full list
      certificates,
      clubsCount: clubs.length,
      clubs // Send the full list
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
