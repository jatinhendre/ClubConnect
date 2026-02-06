import Club from "../models/Club.js";
import User from "../models/User.js";

// Get All Clubs
export const getClubs = async (req, res) => {
  const clubs = await Club.find();
  res.json(clubs);
};

// Add Student To Club
export const addStudentToClub = async (req, res) => {
  try {
    const { clubId, studentId } = req.body;

    const club = await Club.findById(clubId);
    const student = await User.findById(studentId);

    if (!club || !student) {
      return res.status(404).json({ message: "Not found" });
    }

    club.members.push(studentId);
    student.clubs.push(clubId);

    await club.save();
    await student.save();

    res.json({ message: "Student added to club" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getClubById = async (req, res) => {
  const club = await Club.findById(req.params.id)
    .populate("members", "name email");

  res.json(club);
};