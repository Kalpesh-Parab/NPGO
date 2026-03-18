import express from "express";
import {
  getAllDestinations,
  getDestinationByCode,
  getDestinationsByCountry,
  createDestination,
} from "../controllers/destinationController.js";

const router = express.Router();

// 📥 Get all
router.get("/", getAllDestinations);

// 📄 Get by country
router.get("/country/:countryCode", getDestinationsByCountry);

// 📄 Get by code
router.get("/:code", getDestinationByCode);

// ➕ Create
router.post("/create", createDestination);

export default router;