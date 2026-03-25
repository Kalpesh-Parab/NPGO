import express from "express";
import {
  getAllDestinations,
  getDestinationByCode,
  getDestinationsByCountry,
  createDestination,
  updateDestinationMedia,
  deleteDestinationMedia,
} from "../controllers/destinationController.js";
import { toggleDestinationActive } from "../controllers/destinationToggleController.js";

const router = express.Router();

// 📥 Get all
router.get("/", getAllDestinations);

// 📄 Get by country
router.get("/country/:countryCode", getDestinationsByCountry);

// 📄 Get by code
router.get("/:code", getDestinationByCode);

// ➕ Create
router.post("/create", createDestination);

router.patch("/toggle/:code", toggleDestinationActive);

// 📷 Update media
router.patch("/media/:code", updateDestinationMedia);

// 🗑️ Delete media
router.patch("/delete-media/:code", deleteDestinationMedia);

export default router;