import Homepage from "../models/Homepage.js";

export const getHomepage = async (req, res) => {
  try {
    const homepage = await Homepage.findOne();
    res.status(200).json(homepage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHomepage = async (req, res) => {
  try {
    const homepage = await Homepage.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );

    res.status(200).json(homepage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};