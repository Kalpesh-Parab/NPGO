import express from "express";
import {
  createCountry,
  getCountries,
  getCountryByCode,
} from "../controllers/countryController.js";

const router = express.Router();

// ➕ Create
router.post("/create", createCountry);

// 📥 Get all
router.get("/", getCountries);

// 📄 Get by code
router.get("/:code", getCountryByCode);

export default router;