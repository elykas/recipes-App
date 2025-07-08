import { Ingredient } from "../models/recipeModel";
import { pgUpdateRecipeIngredients } from "../dal/ingredientsDal";
export const updateRecipeIngredientsService = async (
  recipeId: number,
  ingredients: Ingredient[]
): Promise<void> => {
  await pgUpdateRecipeIngredients(
    recipeId,
    ingredients
  );
};
