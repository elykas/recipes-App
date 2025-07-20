import prisma from "../config/database";
import ErrorResponse from "../utils/errors/errors";
import { pgGetRecipeIdByPublicId } from "./recipesDAL";
import { pgGetUserIdByPublicId } from "./userDal";


export const pgAddToFavoriteRecipes = async (
  publicId: string,
  publicIdRecipe: string
): Promise<void> => {
  const userId:number | null = await pgGetUserIdByPublicId(publicId);

  const recipeId: number | null = await pgGetRecipeIdByPublicId(publicIdRecipe);

  if (!userId || !recipeId) throw ErrorResponse("User not found", 404);

  await prisma.favoriteRecipes.create({
    data: {
      userId: userId,
      recipeId: recipeId,
    },
  });
};


export const pgRemoveFromFavoriteRecipes = async (
  publicId: string,
  publicIdRecipe: string
): Promise<void> => {
  const userId:number | null = await pgGetUserIdByPublicId(publicId);

  const recipeId: number | null = await pgGetRecipeIdByPublicId(publicIdRecipe);

  if (!userId || !recipeId) throw new Error("User or Recipe not found");

  await prisma.favoriteRecipes.delete({
    where: {
      userId_recipeId: {
        userId: userId,
        recipeId: recipeId,
      },
    },
  });
};