import express from "express";
import protect from "../middlewares/authMiddleWare.js";
import upload from "../configs/multer.js";
import { uploadResource, getAllResources, getResources } from "../controllers/resourceController.js";

const router = express.Router();

// Upload a resource (multipart/form-data: file)
router.post("/upload", protect, upload.single("file"), uploadResource);

// Get all resources
router.get("/", getAllResources);

// Search/filter resources
router.get("/search", getResources);

export default router;
