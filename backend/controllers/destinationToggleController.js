import Destination from '../models/Destination.js';
import Package from '../models/Package.js';
import Country from '../models/Country.js';

export const toggleDestinationActive = async (req, res) => {
  try {
    const { code } = req.params;
    const { isActive } = req.body;

    const destination = await Destination.findOne({ code });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found',
      });
    }

    // 🔥 Get parent country
    const country = await Country.findById(destination.country);

    if (!country) {
      return res.status(404).json({
        success: false,
        message: 'Parent country not found',
      });
    }

    // ❌ BLOCK: Cannot activate if country inactive
    if (isActive && !country.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Cannot activate destination while country is inactive',
      });
    }

    // 🔥 Update destination
    destination.isActive = isActive;
    await destination.save();

    if (!isActive) {
      // 🔴 Deactivate packages
      await Package.updateMany(
        { destination: destination._id },
        { isActive: false },
      );
    } else {
      // 🟢 Activate packages
      await Package.updateMany(
        { destination: destination._id },
        { isActive: true },
      );
    }

    return res.status(200).json({
      success: true,
      message: `Destination ${
        isActive ? 'activated' : 'deactivated'
      } successfully`,
    });
  } catch (error) {
    console.error('toggleDestinationActive error:', error);

    return res.status(500).json({
      success: false,
      message: 'Error toggling destination',
      error: error.message,
    });
  }
};
