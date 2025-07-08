import prisma from "../config/database";
import { Category, IRecipe } from "../models/recipeModel";
import { FullRecipe } from "../types/responses";

export const pgGetAllRecipes = async (
  authorId?: number
): Promise<FullRecipe[]> => {
  const recipes: FullRecipe[] = await prisma.recipe.findMany({
    where: authorId ? { authorId } : undefined,
    include: {
      ingredients: true,
      categories: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return recipes;
};

export const pgGetRecipeById = async (
  id: number
): Promise<FullRecipe | null> => {
  const recipe: FullRecipe | null = await prisma.recipe.findUnique({
    where: { id },
    include: {
      ingredients: true,
      categories: true,
    },
  });
  return recipe;
};

export const pgCreateRecipe = async (
  recipeData: IRecipe,
  authorId: number
): Promise<FullRecipe> => {
  const newRecipe = await prisma.recipe.create({
    data: {
      name: recipeData.name,
      categories: {
        connect: recipeData.categories.map((category) => ({
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
};

export const pgUpdateRecipe = async (
  recipeData: Partial<IRecipe>
): Promise<FullRecipe> => {
  const updatedRecipe = await prisma.recipe.update({
    where: { id: recipeData.id },
    data: {
      name: recipeData.name,
      steps: recipeData.steps,
      prepTime: recipeData.prepTime,
      imageUrl: recipeData.imageUrl,
    },
    include: { ingredients: true, categories: true },
  });
  return updatedRecipe;
};

export const pgUpdateRecipeCategories = async (
    recipeId: number,
    categories: Category[]
): Promise<void> => {
    await prisma.recipe.update({
    where: { id: recipeId },
    data: {
      categories: {
        set: categories.map((category) => ({ id: category.id })), 
      },
    },
  });
};

export const pgDeleteRecipe = async (id: number): Promise<FullRecipe> => {
  const recipe = await prisma.recipe.delete({
    where: { id },
    include: { ingredients: true, categories: true },
  });
  return recipe;
};

export const pgGetRecipesByCategory = async (
  categoryId: number,
  authorId?: number
): Promise<FullRecipe[]> => {
  const recipes = await prisma.recipe.findMany({
    where: {
      categories: {
        some: {
          id: categoryId,
        },
      },
      ...(authorId ? { authorId } : {}),
    },
    orderBy: { createdAt: "desc" },
    include: { ingredients: true, categories: true },
  });
  return recipes;
};
