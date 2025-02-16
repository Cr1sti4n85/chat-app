import cloudinary from "./cloudinary";

export const uploadImage = async (image: string) => {
  return await cloudinary.uploader.upload(image);
};
