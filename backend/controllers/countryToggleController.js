import Country from "../models/Country.js";
import Destination from "../models/Destination.js";
import Package from "../models/Package.js";

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

    // 🔥 Update country status
    country.isActive = isActive;
    await country.save();

    // 🔥 Get all destinations under this country
    const destinations = await Destination.find({
      country: country._id,
    });

    const destinationIds = destinations.map((d) => d._id);

    if (!isActive) {
      // 🔴 DEACTIVATE EVERYTHING

      // 1️⃣ Destinations OFF
      await Destination.updateMany(
        { country: country._id },
        { isActive: false }
      );

      // 2️⃣ Packages under destinations OFF
      await Package.updateMany(
        { destination: { $in: destinationIds } },
        { isActive: false }
      );

      // 3️⃣ Country-level packages OFF
      await Package.updateMany(
        { country: country._id },
        { isActive: false }
      );

    } else {
      // 🟢 ACTIVATE EVERYTHING

      // 1️⃣ Destinations ON
      await Destination.updateMany(
        { country: country._id },
        { isActive: true }
      );

      // 2️⃣ Packages under destinations ON
      await Package.updateMany(
        { destination: { $in: destinationIds } },
        { isActive: true }
      );

      // 3️⃣ Country-level packages ON
      await Package.updateMany(
        { country: country._id },
        { isActive: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: `Country ${
        isActive ? "activated" : "deactivated"
      } successfully`,
    });

  } catch (error) {
    console.error("toggleCountryActive error:", error);

    return res.status(500).json({
      success: false,
      message: "Error toggling country",
      error: error.message,
    });
  }
};