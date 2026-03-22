import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email'],
    },

    phone: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    // 🌍 Location Tracking
    location: {
      ip: String,
      country: String,
      city: String,
    },

    // 📊 Source Tracking
    source: {
      page: { type: String },
      type: {
        type: String,
        enum: ['home', 'package', 'destination', 'corporate', 'merch'],
        default: 'home',
      },
      slug: { type: String },
      subSlug: { type: String }, // 🔥 important (you’re already sending this)
    },
  },
  { timestamps: true },
);

// 🔥 Index for analytics later
contactSchema.index({ 'source.type': 1, 'source.slug': 1 });

export default mongoose.model('Contact', contactSchema);
