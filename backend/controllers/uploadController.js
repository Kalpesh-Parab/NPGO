import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const media = await uploadToCloudinary(req.file.buffer);

    res.status(200).json(media);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};