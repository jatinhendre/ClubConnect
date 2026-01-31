import User from "../models/User.js";

export const getAllStudents = async (req, res) => {
  try {
    console.log("reached from studens")
    const students = await User.find({ role: "student" })
      .select("name email clubs")
      .populate("clubs", "clubName");

    res.json(students);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};