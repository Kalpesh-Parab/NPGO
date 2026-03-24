import mongoose from 'mongoose';

const merchandiseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: '',
    },

    price: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: '₹',
    },

    images: [
      {
        type: String, // URL (Cloudinary / S3 later)
      },
    ],

    category: {
      type: String,
      default: 'general', // cap, bottle, bag etc later
    },

    affiliateLink: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Merchandise', merchandiseSchema);
