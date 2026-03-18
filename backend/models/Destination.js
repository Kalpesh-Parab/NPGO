import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // 🔥 Future ready (optional)
    media: {
      type: String, // cloudinary URL
    },

    mediaType: {
      type: String,
      enum: ["image", "video"],
    },

    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Destination", destinationSchema);