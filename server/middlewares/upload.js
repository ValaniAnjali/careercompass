import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "resources",
    resource_type: "raw", // for PDF
    format: async (req, file) => "pdf",
  },
});

const upload = multer({ storage });

export default upload;
