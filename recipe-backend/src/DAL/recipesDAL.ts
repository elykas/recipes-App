import prisma from "../config/database";
import { IRecipe } from "../models/recipeModel";
import { FullRecipe } from "../types/responses";

export const pgGetAllRecipes = async (
  authorId?: number
): Promise<FullRecipe[]> => {
  try {
    const recipes: FullRecipe[] = await prisma.recipe.findMany({
      where: authorId ? { authorId } : undefined,
      include: {
        ingredients: true,
        categories: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return recipes;
  } catch (error) {
    throw new Error("Failed to fetch recipes: " + error);
  }
};

export const pgGetRecipeById = async (
  id: number
): Promise<FullRecipe | null> => {
  try {
    const recipe: FullRecipe | null = await prisma.recipe.findUnique({
      where: { id },
      include: {
        ingredients: true,
        categories: true,
      },
    });
    return recipe;
  } catch (error) {
    throw new Error("Failed to find recipe by id: " + error);
  }
};

export const pgCreateRecipe = async (
  recipeData: IRecipe,
  authorId: number
): Promise<FullRecipe> => {
  try {
    const newRecipe = await prisma.recipe.create({
      data: {
        name: recipeData.name,
        categories: {
          create: recipeData.categories.map((category) => ({
            id: category.id,
          })),
        },
        steps: recipeData.steps,
        prepTime: recipeData.prepTime ?? 30,
        imageUrl: recipeData.imageUrl,
        authorId,
        ingredients: {
          create: recipeData.ingredients.map((ingredient) => ({
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
          })),
        },
      },
      include: {
        ingredients: true,
        categories: true,
      },
    });
    return newRecipe;
  } catch (error) {
    throw new Error(
      "Failed to create recipe on the postgres database: " + error
    );
  }
};

export const pgUpdateRecipe = async (
  id: number,
  recipeData: Partial<IRecipe>
): Promise<FullRecipe> => {
  try {
    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: {
        name: recipeData.name,
        category: recipeData.category,
        steps: recipeData.steps,
        prepTime: recipeData.prepTime,
        imageUrl: recipeData.imageUrl,
        ingredients: {
          deleteMany: {},
          create: recipeData.ingredients?.map((ingredient) => ({
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
          })),
        },
      },
      include: { ingredients: true },
    });
    return updatedRecipe;
  } catch (error) {
    throw new Error("Failed to update recipe: " + error);
  }
};

export const pgDeleteRecipe = async (id: number) => {
  try {
    const recipe = await prisma.recipe.delete({
      where: { id },
    });
    return recipe;
  } catch (error) {
    throw new Error("Failed to delete recipe: " + error);
  }
};

export const pgGetRecipesByCategory = async (
  category: string,
  authorId?: number
) => {
  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        category: { has: category },
        ...(authorId ? { authorId } : {}),
      },
      orderBy: { createdAt: "desc" },
    });
    return recipes;
  } catch (error) {
    throw new Error("Failed to fetch recipes by category: " + error);
  }
};
