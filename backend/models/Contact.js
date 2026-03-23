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

    // 🆕 STATUS
    status: {
      type: String,
      enum: ['new', 'contacted', 'closed'],
      default: 'new',
    },

    // 🌍 Location Tracking
    location: {
      ip: String,
      country: String,
      city: String,
    },

    // 📊 Source Tracking
    type: {
  type: String,
  enum: [
    'home',
    'package',
    'event',        // ✅ ADD THIS
    'destination',
    'corporate',
    'merch',
  ],
  default: 'home',
},
  },
  { timestamps: true }
);

// 🔥 Indexing (analytics + filtering)
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ 'source.type': 1, 'source.slug': 1 });

export default mongoose.model('Contact', contactSchema);