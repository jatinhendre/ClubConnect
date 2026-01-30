import express from "express";
import { submitFeedback, getFeedbackByEvent } from "../controllers/feedbackController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, submitFeedback);
router.get("/:eventId", protect, adminOnly, getFeedbackByEvent);

export default router;
