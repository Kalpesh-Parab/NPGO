import Country from "../models/Country.js";
import Destination from "../models/Destination.js";

// ➕ Create Country
export const createCountry = async (req, res) => {
  try {
    const { name, code, type, media, mediaType } = req.body;

    // check existing
    const existing = await Country.findOne({ code });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Country already exists",
      });
    }

    const country = await Country.create({
      name,
      code,
      type,
      media,
      mediaType,
    });

    res.status(201).json({
      success: true,
      message: "Country created successfully",
      data: country,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating country",
      error: error.message,
    });
  }
};

// 📥 Get All Countries
export const getCountries = async (req, res) => {
  try {
    const countries = await Country.find().populate("destinations");

    res.status(200).json({
      success: true,
      data: countries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching countries",
      error: error.message,
    });
  }
};

// 📄 Get Single Country by Code
export const getCountryByCode = async (req, res) => {
  try {
    const { code } = req.params;

const country = await Country.findOne({ code }).populate({
  path: "destinations",
  select: "name code isActive"
});

    if (!country) {
      return res.status(404).json({
        success: false,
        message: "Country not found",
      });
    }

    res.status(200).json({
      success: true,
      data: country,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching country",
      error: error.message,
    });
  }
};