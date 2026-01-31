import express from "express";
import { getAllStudents } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/students", protect, adminOnly, getAllStudents);

export default router;