import { pgUpdateRecipeIngredients } from "../dal/ingredientsDal";
import { IIngredient } from "../models/recipeModel";
export const updateRecipeIngredientsService = async (
  recipeId: number,
  ingredients: IIngredient[]
): Promise<void> => {
  await pgUpdateRecipeIngredients(recipeId, ingredients);
};
