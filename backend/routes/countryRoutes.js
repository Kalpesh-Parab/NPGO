import express from "express";
import {
  createCountry,
  getCountries,
  getCountryByCode,
  updateCountryMedia,
} from "../controllers/countryController.js";
import { toggleCountryActive } from "../controllers/countryToggleController.js";

const router = express.Router();

// ➕ Create
router.post("/create", createCountry);

// 📥 Get all
router.get("/", getCountries);

// 📄 Get by code
router.get("/:code", getCountryByCode);

router.patch("/toggle/:code", toggleCountryActive);

// 📷 Update media
router.patch("/media/:code", updateCountryMedia);

export default router;