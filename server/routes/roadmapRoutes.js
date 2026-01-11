// routes/roadmapRoutes.js
import express from "express";
import protect from "../middlewares/authMiddleware.js";
import upload from "../configs/multer.js";
import {
  uploadRoadmap,
  getAllRoadmaps,
  getRoadmapsByRole,
} from "../controllers/roadmapController.js";
import Roadmap from "../models/Roadmap.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.array("pdfs", 5), // multiple PDFs
  uploadRoadmap
);

router.get("/", getAllRoadmaps);
// router.get("/by-role", getRoadmapsByRole);

router.get("/by-role", async (req, res) => {
  try {
    const { role } = req.query;

    const roadmaps = await Roadmap.find({ role })
      .populate("uploadedBy", "name"); // 🔥 THIS LINE

    res.json(roadmaps);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch roadmaps" });
  }
});


export default router;
