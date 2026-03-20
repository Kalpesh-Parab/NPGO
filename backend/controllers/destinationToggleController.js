import Destination from "../models/Destination.js";
import Package from "../models/Package.js";

export const toggleDestinationActive = async (req, res) => {
  try {
    const { code } = req.params;
    const { isActive } = req.body;

    const destination = await Destination.findOne({ code });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    // 🔥 Update destination
    destination.isActive = isActive;
    await destination.save();

    // 🔥 CASCADE ONLY WHEN DEACTIVATING
    if (!isActive) {
      await Package.updateMany(
        { destination: destination._id },
        { isActive: false }
      );
    }

    res.status(200).json({
      success: true,
      message: `Destination ${isActive ? "activated" : "deactivated"} successfully`,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error toggling destination",
      error: error.message,
    });
  }
};