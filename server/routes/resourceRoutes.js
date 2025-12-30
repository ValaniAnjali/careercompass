import express from "express";
import upload from "../middlewares/upload.js";
import protect from "../middlewares/authMiddleware.js";
import {
  uploadResource,
  getAllResources
} from "../controllers/resourceController.js";

const router = express.Router();

// Upload resource (protected)
router.post("/", protect, upload.single("file"), uploadResource);

// Get all resources (protected)
router.get("/", protect, getAllResources);

export default router;
