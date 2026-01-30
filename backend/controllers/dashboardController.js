import User from "../models/User.js";
import Club from "../models/Club.js";
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import Certificate from "../models/Certificate.js";

export const getStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalClubs = await Club.countDocuments();
    const totalEvents = await Event.countDocuments();
    const totalRegistrations = await Registration.countDocuments();
    const totalCertificates = await Certificate.countDocuments();

    res.json({
      totalStudents,
      totalClubs,
      totalEvents,
      totalRegistrations,
      totalCertificates
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
