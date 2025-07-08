import prisma from "../config/database";
import { Ingredient } from "../models/recipeModel";

export const pgUpdateRecipeIngredients = async (
  recipeId: number,
  ingredients: Ingredient[]
): Promise<void> => {
  await prisma.ingredient.deleteMany({
    where: { recipeId },
  });

  await prisma.ingredient.createMany({
    data: ingredients.map((ing) => ({
      name: ing.name,
      quantity: ing.quantity,
      unit: ing.unit,
      recipeId, 
    })),
  });
};