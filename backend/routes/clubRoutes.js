import express from "express";
import { createClub, getClubs, addStudentToClub, getClubById } from "../controllers/clubController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", protect, adminOnly, createClub);
router.get("/", protect, getClubs);
router.post("/add-student", protect, adminOnly, addStudentToClub);
router.get("/:id", protect, getClubById);

export default router;