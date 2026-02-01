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

    const registrations = await Registration.countDocuments({
      studentId: req.user.id,
      status: "approved"
    });

    const certificates = await Certificate.countDocuments({
      studentId: req.user.id
    });

    const clubs = await Club.countDocuments({
      members: req.user.id
    });

    res.json({
      registrations,
      certificates,
      clubs
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
