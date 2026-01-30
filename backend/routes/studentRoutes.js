import express from "express";
import { createStudent } from "../controllers/studentController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, adminOnly, createStudent);

export default router;
