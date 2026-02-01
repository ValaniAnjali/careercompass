// models/Roadmap.js
import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    role: {
      type: String,
      required: true, // Frontend, Backend, Android, etc
    },

    brief: {
      type: String,
      required: true,
    },

    whyFollow: {
      type: String,
      required: true,
    },

    pdfs: [
      {
        fileUrl: String,
        publicId: String,
      },
    ],

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    uploaderName: {
      type: String,
    },

    

  },
  { timestamps: true }
);

const Roadmap = mongoose.model("Roadmap", roadmapSchema);
export default Roadmap;
