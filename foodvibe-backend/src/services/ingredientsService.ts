import { Prisma } from "@prisma/client";
import { pgUpdateRecipeIngredients } from "../dal/ingredientsDal";
import { IIngredient } from "../models/recipeModel";
export const updateRecipeIngredientsService = async (
  publicRecipeId: string,
  ingredients: IIngredient[],
  tx: Prisma.TransactionClient
): Promise<void> => {
  await pgUpdateRecipeIngredients(publicRecipeId, ingredients, tx);
};
