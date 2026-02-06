import ClubRegistration from "../models/ClubRegistration.js";
import Club from "../models/Club.js";
import User from "../models/User.js";

// Student registers for a club
export const registerClub = async (req, res) => {
  try {
    const { clubId, studentName, class: studentClass, contactDetails } = req.body;

    // Check if already registered
    const already = await ClubRegistration.findOne({
      studentId: req.user.id,
      clubId
    });

    if (already) {
      return res.status(400).json({ message: "Already registered for this club" });
    }

    const registration = await ClubRegistration.create({
      studentId: req.user.id,
      clubId,
      studentName,
      class: studentClass,
      contactDetails
    });

    res.status(201).json({ message: "Club registration submitted successfully", registration });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get student's club registrations
export const getMyClubRegistrations = async (req, res) => {
  try {
    const registrations = await ClubRegistration.find({ studentId: req.user.id })
      .populate("clubId", "clubName description")
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin gets all club registrations
export const getAllClubRegistrations = async (req, res) => {
  try {
    const registrations = await ClubRegistration.find()
      .populate("studentId", "name email")
      .populate("clubId", "clubName")
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin approve/reject club registration
export const updateClubRegistrationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const registration = await ClubRegistration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    registration.status = status;
    await registration.save();

    // Add student to club members when approved
    if (status === "approved") {
      await Club.findByIdAndUpdate(
        registration.clubId,
        { $addToSet: { members: registration.studentId } }
      );
      
      // Also add club to student's clubs array
      await User.findByIdAndUpdate(
        registration.studentId,
        { $addToSet: { clubs: registration.clubId } }
      );
    }

    res.json({ message: "Registration status updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
