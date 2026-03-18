import mongoose from "mongoose";
import dotenv from "dotenv";

import Country from "../models/Country.js";
import Destination from "../models/Destination.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const worldMap = JSON.parse(
  fs.readFileSync(path.join(__dirname, "worldMap.json"), "utf-8")
);

const indiaMap = JSON.parse(
  fs.readFileSync(path.join(__dirname, "indiaMap.json"), "utf-8")
);

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected for seeding 🌱");

    // ⚠️ Clear old data
    await Country.deleteMany();
    await Destination.deleteMany();

    // 🌍 1. Seed Countries
    const countriesData = worldMap.worldMap.map((c) => ({
      name: c.name,
      code: c.id,
      type: c.id === "IN" ? "domestic" : "international",
      isActive: c.id === "IN", // Only India active
    }));

    const createdCountries = await Country.insertMany(countriesData);

    console.log("Countries Seeded ✅");

    // 🇮🇳 2. Find India
    const india = createdCountries.find((c) => c.code === "IN");

    if (!india) throw new Error("India not found in countries");

    // 📍 3. Seed Destinations (India States)
    const destinationsData = indiaMap.indiaMap.map((d) => ({
      name: d.name,
      code: d.id,
      country: india._id,
      isActive: true,
    }));

    const createdDestinations = await Destination.insertMany(destinationsData);

    console.log("Destinations Seeded ✅");

    // 🔗 4. Link destinations to India
    india.destinations = createdDestinations.map((d) => d._id);
    await india.save();

    console.log("Linking Completed ✅");

    console.log("🌱 Seeding Completed Successfully 🚀");

    process.exit();
  } catch (error) {
    console.error("Seeding Error ❌", error);
    process.exit(1);
  }
};

seedData();