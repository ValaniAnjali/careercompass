import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    fileUrl: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    uploaderName: { type: String },
  },
  { timestamps: true }   // ✅ THIS adds createdAt & updatedAt automatically
);

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;
