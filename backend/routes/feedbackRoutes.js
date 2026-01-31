import express from "express";
import { submitFeedback, getFeedbackByEvent } from "../controllers/feedbackController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import approvedOnly from "../middleware/approvedOnly.js";

const router = express.Router();

router.post("/", protect, approvedOnly, submitFeedback);
router.get("/:eventId", protect, adminOnly, getFeedbackByEvent);

export default router;
