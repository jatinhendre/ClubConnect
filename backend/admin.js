import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    // connect database
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // admin credentials
    const name = "Admin";
    const email = "admin@clubconnect.com";
    const password = "admin123";

    // check if admin exists
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create admin
    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin Created Successfully");
    console.log({
      email: admin.email,
      password: password
    });

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
