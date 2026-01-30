import User from "../models/User.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/emailUtility.js"

// generate random password
const generatePassword = () => {
  return Math.random().toString(36).slice(-8);
};

export const createStudent = async (req, res) => {
  try {
    const { name, email } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const plainPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const student = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student"
    });
    console.log("Email Recieved!", process.env.EMAIL_PASS)
    console.log("Email Recieved!", process.env.EMAIL_USER)
    await sendEmail(
      email,
      "Club Connect Login Credentials",
      `Hello ${name},

Your account has been created.

Email: ${email}
Password: ${plainPassword}

Login and change your password after first login.

Club Connect Team`
    );

    res.status(201).json({ message: "Student created and email sent" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
