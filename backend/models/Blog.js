import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const contentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'media'],
    required: true,
  },

  // For text blocks
  text: {
    type: String,
  },

  // For media blocks (image/video)
  media: {
    type: mediaSchema,
  },
});

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },

    author: { type: String },
    category: { type: String },

    thumbnail: { type: String }, // card image

    content: [contentBlockSchema], // 🔥 MAIN MAGIC

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model('Blog', blogSchema);
