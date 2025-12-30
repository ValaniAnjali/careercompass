import Resource from "../models/Resource.js";

// GET ALL RESOURCES
export const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find()
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch resources" });
  }
};


export const uploadResource = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File required" });
    }

    const resource = new Resource({
      title,
      category,
      fileUrl: req.file.path,
      uploadedBy: req.userId,
      uploaderName: req.user.name,
    });

    await resource.save();

    res.status(201).json({
      message: "Resource uploaded successfully",
      data: resource
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed" });
  }
};

export const getResources = async (req, res) => {
  const { category, search } = req.query;

  let filter = {};
  if (category) filter.category = category;
  if (search) filter.title = { $regex: search, $options: "i" };

  const resources = await Resource.find(filter).sort({ createdAt: -1 });
  res.json(resources);
};
