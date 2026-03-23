import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
    required: true,
    index: true,
  },

  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
    default: null,
    index: true,
  },

  price: Number,
  currency: String,

  types: [String],

  heroMedia: {
    type: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },
    url: String,
  },

  description: String,

  gallery: [
    {
      type: {
        type: String,
        enum: ["image", "video"],
        default: "image",
      },
      url: String,
      caption: String,
    },
  ],

  itinerary: [
    {
      id: Number,
      day: String,
      title: String,

      description: [
        {
          heading: String,
          content: String,
        },
      ],

      media: [
        {
          type: {
            type: String,
            enum: ["image", "video"],
          },
          url: String,
          caption: String,
        },
      ],
    },
  ],

  inclusions: {
    included: [String],
    notIncluded: [String],
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Event", eventSchema);