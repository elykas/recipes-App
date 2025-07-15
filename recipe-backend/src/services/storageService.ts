import { v4 as uuid } from "uuid";
import { supabase } from "../config/supabaseStorageConfig";
import IRecipe from "../models/recipeModel";
import { createRecipeService, getRecipeByIdService, updateRecipeService } from "./recipeService";

type UploadType = "user" | "recipe-image" | "recipe-video";

export const uploadMediaService = async (
  buffer: Buffer,
  userId: number,
  mimeType: string,
  type: UploadType
): Promise<string> => {
  const bucket = "recipes-app-media";

  const fileName = `${type}/${userId}/${uuid()}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, buffer, {
      contentType: mimeType,
      upsert: true,
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return urlData.publicUrl;
};


export const createRecipeWithMediaService = async (
  recipeData: IRecipe,
  userId: number,
  files: { images?: Express.Multer.File[]; video?: Express.Multer.File[] }
) => {
  let imageUrls: string[] = [];
  if (files?.images) {
    imageUrls = await Promise.all(
      files.images.map((file) =>
        uploadMediaService(file.buffer, userId, file.mimetype, "recipe-image")
      )
    );
  }

  let videoUrl = "";
  if (files?.video && files.video.length > 0) {
    videoUrl = await uploadMediaService(
      files.video[0].buffer,
      userId,
      files.video[0].mimetype,
      "recipe-video"
    );
  }

  const finalData = {
    ...recipeData,
    imageUrls,
    videoUrl,
  };

  return await createRecipeService(finalData, userId);
};

//NOTE: I have to think about what include a recipe if many images and videos
export const updateRecipeWithMediaService = async (
  recipeId: number,
  updatedData: IRecipe,
  userId: number,
  files: { images?: Express.Multer.File[]; video?: Express.Multer.File[] }
) => {
  const existingRecipe = await getRecipeByIdService(recipeId);
  if (!existingRecipe) throw new Error("Recipe not found");

//   let imageUrls = existingRecipe.imageUrl || [];
//   if (files?.images && files.images.length > 0) {
//     imageUrls = await Promise.all(
//       files.images.map((file) =>
//         uploadMediaService(file.buffer, userId, file.mimetype, "recipe-image")
//       )
//     );
//   }

//   let videoUrl = existingRecipe.videoUrl || "";
//   if (files?.video && files.video.length > 0) {
//     videoUrl = await uploadMediaService(
//       files.video[0].buffer,
//       userId,
//       files.video[0].mimetype,
//       "recipe-video"
//     );
//   }

   const finalData = {
     ...updatedData,
//     imageUrls,
//     videoUrl,
   };

  return finalData;
};
