import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  adminStats,
  studentStats
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/admin", protect, adminStats);
router.get("/student", protect, studentStats);

export default router;
