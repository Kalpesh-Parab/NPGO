import Destination from "../models/Destination.js";
import Country from "../models/Country.js";

// 📄 Get all destinations
export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find()
      .populate("country", "name code type");

    res.status(200).json({
      success: true,
      data: destinations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching destinations",
      error: error.message,
    });
  }
};

// 📄 Get destination by code (MAIN API)
export const getDestinationByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const destination = await Destination.findOne({ code })
      .populate("country", "name code type");

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    res.status(200).json({
      success: true,
      data: destination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching destination",
      error: error.message,
    });
  }
};

// 📄 Get destinations by country
export const getDestinationsByCountry = async (req, res) => {
  try {
    const { countryCode } = req.params;

    const country = await Country.findOne({ code: countryCode });

    if (!country) {
      return res.status(404).json({
        success: false,
        message: "Country not found",
      });
    }

    const destinations = await Destination.find({
      country: country._id,
    });

    res.status(200).json({
      success: true,
      data: destinations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching destinations",
      error: error.message,
    });
  }
};

// ➕ Create destination (Admin use)
export const createDestination = async (req, res) => {
  try {
    const { name, code, countryCode } = req.body;

    const country = await Country.findOne({ code: countryCode });

    if (!country) {
      return res.status(400).json({
        success: false,
        message: "Invalid country",
      });
    }

    const existing = await Destination.findOne({ code });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Destination already exists",
      });
    }

    const destination = await Destination.create({
      name,
      code,
      country: country._id,
    });

    // 🔗 attach to country
    country.destinations.push(destination._id);
    await country.save();

    res.status(201).json({
      success: true,
      message: "Destination created successfully",
      data: destination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating destination",
      error: error.message,
    });
  }
};