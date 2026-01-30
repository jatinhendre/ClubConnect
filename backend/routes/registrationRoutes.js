import express from "express";
import {
  registerEvent,
  getRegistrations,
  updateStatus
} from "../controllers/registrationController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, registerEvent);
router.get("/", protect, adminOnly, getRegistrations);
router.patch("/:id", protect, adminOnly, updateStatus);

export default router;
