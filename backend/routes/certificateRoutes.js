import express from "express";
import { generateCertificate, getMyCertificates } from "../controllers/certificateController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", protect, adminOnly, generateCertificate);
router.get("/my", protect, getMyCertificates);

export default router;
