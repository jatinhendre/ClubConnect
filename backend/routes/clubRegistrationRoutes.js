import express from "express";
import {
  registerClub,
  getMyClubRegistrations,
  getAllClubRegistrations,
  updateClubRegistrationStatus
} from "../controllers/clubRegistrationController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, registerClub);
router.get("/my", protect, getMyClubRegistrations);
router.get("/", protect, adminOnly, getAllClubRegistrations);
router.patch("/:id", protect, adminOnly, updateClubRegistrationStatus);

export default router;
