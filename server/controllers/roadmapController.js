// controllers/roadmapController.js
import Roadmap from "../models/Roadmap.js";
import fs from "fs";
import imageKit from "../configs/imageKit.js";

export const uploadRoadmap = async (req, res) => {
  try {
    const { title, role, brief, whyFollow } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one PDF required" });
    }

    const pdfs = [];

    for (const file of req.files) {
      const fileBuffer = fs.readFileSync(file.path);

      const uploadRes = await imageKit.upload({
        file: fileBuffer.toString("base64"),
        fileName: file.filename,
      });

      pdfs.push({
        fileUrl: uploadRes.url,
        publicId: uploadRes.fileId,
      });

      fs.unlinkSync(file.path);
    }

    const roadmap = new Roadmap({
      title,
      role,
      brief,
      whyFollow,
      pdfs,
      uploadedBy: req.userId,
      uploaderName: req.user?.name,
    });

    await roadmap.save();

    res.status(201).json({
      message: "Roadmap uploaded successfully",
      data: roadmap,
    });
  } catch (error) {
    res.status(500).json({ message: "Roadmap upload failed" });
  }
};
export const getAllRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find()
      .sort({ createdAt: -1 });

    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch roadmaps" });
  }
};
export const getRoadmapsByRole = async (req, res) => {
  try {
    const { role } = req.query;

    const roadmaps = await Roadmap.find({ role })
      .sort({ createdAt: -1 });

    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch role-based roadmaps" });
  }
};
