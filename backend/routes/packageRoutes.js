import express from "express";

import {
  createPackage,
  getAllPackages,
  getPackageBySlug,
  updatePackage,
  deletePackage,
  getPackagesByLocation,
} from "../controllers/packageController.js";

const router = express.Router();

router.post("/", createPackage);
router.get("/", getAllPackages);
router.get("/:slug", getPackageBySlug);
router.put("/:id", updatePackage);
router.delete("/:id", deletePackage);
router.get('/by-location', getPackagesByLocation);

export default router;