import { Prisma } from "@prisma/client";
import prisma from "../config/database";
import { IIngredient } from "../models/recipeModel";
import ErrorResponse from "../utils/errors/errors";
import { pgGetRecipeIdByPublicId } from "./recipesDAL";

export const pgUpdateRecipeIngredients = async (
  publicRecipeId: string,
  ingredients: IIngredient[],
  tx: Prisma.TransactionClient
): Promise<void> => {
  const recipeId: number | null = await pgGetRecipeIdByPublicId(publicRecipeId);

  if (!recipeId) throw ErrorResponse("Recipe not found", 404);

  await tx.ingredient.deleteMany({
    where: { recipeId },
  });

  if (ingredients.length > 0) {
    await tx.ingredient.createMany({
      data: ingredients.map((ing) => ({
        name: ing.name,
        quantity: ing.quantity,
        unit: ing.unit,
        recipeId,
      })),
    });
  }
};
