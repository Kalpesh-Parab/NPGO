import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoutes.js";
import upLoadRoutes from "./routes/uploadRoutes.js";
import homepageRoutes from "./routes/homepageRoutes.js";
import countryRoutes from "./routes/countryRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/upload", upLoadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/homepage", homepageRoutes);
app.use("/api/countries", countryRoutes)
app.use("/api/destinations", destinationRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/contact", contactRoutes);

//HEALTH CHECK
app.get('/health', (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "NPGO backend alive 🚀",
    uptime: process.uptime()
  });
});

app.get('/', (req, res) => {
  res.send('NPGO Backend Running 🚀');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
