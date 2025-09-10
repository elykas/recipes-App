import { v4 as uuid } from "uuid";
import { supabase } from "../config/supabaseStorageConfig";

const bucketName = "foodvibe";

export const uploadSingleImage = async (
  buffer: Buffer,
  userId: string,
  mimeType: string,
  folder: "user" | "recipe" | "group" | "post"
): Promise<string> => {
  const bucket = bucketName;
  const ext = mimeType.split("/")[1];
  const fileName = `${folder}/${userId}/${uuid()}.${ext}`;
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, buffer, {
      contentType: mimeType,
      upsert: true,
    });

  if (error) {
    console.error("Error uploading image:", error.message);
    throw new Error(`Upload failed: ${error.message}`);
  }

  return fileName;
};

export const deleteImageFromStorage = async (filePath: string) => {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .remove([filePath]);

  if (error) {
    console.error("Error deleting old image:", error.message);
    throw error;
  }
  return data;
};
