import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Load env vars here too: ESM hoists imports above other top-level statements,
// so relying on the importing file's dotenv.config() call would run this
// module's cloudinary.config() before process.env is populated.
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
