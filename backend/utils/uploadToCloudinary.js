import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (fileBuffer, folder = "npgo") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",   // handles image or video
        quality: "auto",
        fetch_format: "auto"
      },
      (error, result) => {
        if (error) return reject(error);

        resolve({
          url: result.secure_url,
          type: result.resource_type
        });
      }
    ).end(fileBuffer);
  });
};

export default uploadToCloudinary;