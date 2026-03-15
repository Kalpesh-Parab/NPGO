import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["image", "video"],
    required: true
  },
  alt: {
    type: String,
    default: ""
  }
});

const TestimonialSchema = new mongoose.Schema({
  photo: MediaSchema,
  title: String,
  review: String,
  rating: Number,
  name: String,
  profile: MediaSchema
});

const FAQSchema = new mongoose.Schema({
  question: String,
  answer: String
});

const HomepageSchema = new mongoose.Schema({

  hero: {
    media: MediaSchema,
    heading: String,
    subHeading: String,
    buttonText: String,
    buttonLink: String
  },

  about: {
    sectionTitle: String,
    heading: String,
    description: String,
    image: MediaSchema,
    buttonText: String,
    buttonLink: String
  },

  corporateGallery: {
    title: String,
    typingText: String,
    images: [MediaSchema],
    bottomHeading: String,
    bottomDescription: String,
    buttonText: String,
    buttonLink: String
  },

  homeGallery: {
    title: String,
    description: String,
    images: [MediaSchema],
    bottomDescription: String,
    buttonText: String,
    buttonLink: String
  },

  testimonials: [TestimonialSchema],

  faqs: [FAQSchema]

}, { timestamps: true });

export default mongoose.model("Homepage", HomepageSchema);