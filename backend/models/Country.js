import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
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

    type: {
      type: String,
      enum: ["domestic", "international"],
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    media: {
      type: String, // URL or file path
    },

    mediaType: {
      type: String,
      enum: ["image", "video"],
    },

    destinations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Country", countrySchema);