import { v4 as uuid } from "uuid";
import { supabase } from "../config/supabaseStorageConfig";

export const uploadSingleImage = async (
  buffer: Buffer,
  userId: string,
  mimeType: string,
  folder: "user" | "recipe"
): Promise<string> => {
  const bucket = "recipes-app-media";
  const fileName = `${folder}/${userId}/${uuid()}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, buffer, {
      contentType: mimeType,
      upsert: true,
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  return fileName;
};

export const deleteImageFromStorage = async (filePath: string) => {
  const { data, error } = await supabase.storage
    .from("recipes-app-media")
    .remove([filePath]);

  if (error) {
    console.error("Error deleting old image:", error.message);
    throw error;
  }
  return data;
};
