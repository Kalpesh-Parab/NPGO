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
import eventRoutes from "./routes/eventRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import customEnquiryRoutes from "./routes/customEnquiryRoutes.js";
import merchRoutes from "./routes/merchRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

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
app.use("/api/events", eventRoutes);
app.use("/api/contact", contactRoutes);
app.use('/api/custom-enquiry', customEnquiryRoutes);
app.use('/api/merch', merchRoutes);
app.use('/api/blogs', blogRoutes);

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
