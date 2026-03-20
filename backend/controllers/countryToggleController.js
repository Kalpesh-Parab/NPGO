import Country from "../models/Country.js";
import Destination from "../models/Destination.js";
import Package from "../models/Package.js"; // assuming exists

export const toggleCountryActive = async (req, res) => {
  try {
    const { code } = req.params;
    const { isActive } = req.body;

    const country = await Country.findOne({ code });

    if (!country) {
      return res.status(404).json({
        success: false,
        message: "Country not found",
      });
    }

    // 🔥 Update country
    country.isActive = isActive;
    await country.save();

    // 🔥 CASCADE ONLY WHEN DEACTIVATING
    if (!isActive) {
      const destinations = await Destination.find({ country: country._id });

      const destinationIds = destinations.map(d => d._id);

      // 1️⃣ deactivate destinations
      await Destination.updateMany(
        { country: country._id },
        { isActive: false }
      );

      // 2️⃣ deactivate packages under those destinations
      await Package.updateMany(
        { destination: { $in: destinationIds } },
        { isActive: false }
      );

      // 3️⃣ deactivate country-level packages (international)
      await Package.updateMany(
        { country: country._id },
        { isActive: false }
      );
    }

    res.status(200).json({
      success: true,
      message: `Country ${isActive ? "activated" : "deactivated"} successfully`,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error toggling country",
      error: error.message,
    });
  }
};