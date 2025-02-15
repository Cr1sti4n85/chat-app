import { v2 as cloudinary } from "cloudinary";
import { EnvConfiguration } from "../config/envConfiguration";

cloudinary.config({
  cloud_name: EnvConfiguration().cloudName,
  api_key: EnvConfiguration().cloudKey,
  api_secret: EnvConfiguration().cloudSecret,
});

export default cloudinary;
