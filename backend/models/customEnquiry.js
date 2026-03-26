import mongoose from 'mongoose';

const customEnquirySchema = new mongoose.Schema(
  {
    // 👤 USER INFO
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
    },
    phone: {
      type: String,
      required: true,
    },

    // 🧭 TRIP INFO
    knowDestination: {
      type: String,
      enum: ['yes', 'no'],
    },

    travelDate: {
      type: Date,
    },

    nights: Number,
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 },

    // 🎯 PREFERENCES
    mustDo: String,
    specialOccasion: {
      type: String,
      enum: ['yes', 'no'],
    },
    flights: {
      type: String,
      enum: ['yes', 'no'],
    },
    budget: Number,

    // 🌍 LOCATION (backend injected)
    location: {
      ip: String,
      country: String,
      city: String,
    },

    // 📊 SOURCE TRACKING
    source: {
      page: String, // current page (/customise)
      from: String, // 🔥 previous page (/package/xyz)

      type: {
        type: String,
        enum: [
          'home',
          'package',
          'destination',
          'corporate',
          'merch',
          'custom',
        ],
        default: 'custom',
      },

      slug: String,
      subSlug: String,
    },

    // 🧑‍💼 ADMIN FLOW
    status: {
      type: String,
      enum: ['new', 'checked', 'contacted'],
      default: 'new',
    },
  },
  { timestamps: true },
);

// 🔥 Index for analytics
customEnquirySchema.index({ status: 1, createdAt: -1 });

export default mongoose.model('CustomEnquiry', customEnquirySchema);
