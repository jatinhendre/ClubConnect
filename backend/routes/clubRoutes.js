import express from "express";
import { createClub, getClubs, addStudentToClub } from "../controllers/clubController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", protect, adminOnly, createClub);
router.get("/", protect, getClubs);
router.post("/add-student", protect, adminOnly, addStudentToClub);

export default router;