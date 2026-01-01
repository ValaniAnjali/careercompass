import express from "express";
import protect from "../middlewares/authMiddleWare.js";
import upload from "../configs/multer.js";
import { uploadResource, getAllResources, getResources,getResourceById } from "../controllers/resourceController.js";

const router = express.Router();

// Upload a resource (multipart/form-data: file)
router.post("/upload", protect, upload.single("file"), uploadResource);

// Get all resources
router.get("/", getAllResources);

// Get single resource by ID
router.get("/:id", getResourceById);
// router.get("/:id", getResourceById); // add this route
// Search/filter resources
router.get("/search", getResources);
router.get("/:id", async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
