import prisma from "../config/database";
import { ICategory, IRecipe } from "../models/recipeModel";
import { PreviewRecipes } from "../types/responses";

export const pgGetAllRecipes = async (
  publicId?: string
): Promise<Partial<PreviewRecipes>[]> => {
  const recipes = await prisma.recipe.findMany({
    where: publicId ? { author: { publicId } } : undefined,
    select: {
      publicId: true,
      title: true,
      isPublic: true,
      imageUrl: true,
      difficulty: true,
      _count: {
        select: { likes: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return recipes;
};

export const pgGetRecipeById = async (
  publicId: string
): Promise<PreviewRecipes | null> => {
  const recipe: PreviewRecipes | null = await prisma.recipe.findUnique({
    where: { publicId },
    include: {
      ingredients: true,
      categories: true,
      steps: true,
      likes: true,
    },
  });
  return recipe;
};

//NOTE: when create a recipe need to add the order step for each step
export const pgCreateRecipe = async (
  recipeData: IRecipe,
  authorId: number
): Promise<PreviewRecipes> => {
  const newRecipe = await prisma.recipe.create({
    data: {
      name: recipeData.title,
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

//NOTE: when create a recipe need to add the order step for each step
export const pgUpdateRecipe = async (
  recipeData: Partial<IRecipe>
): Promise<PreviewRecipes> => {
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
  categories: ICategory[]
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

export const pgDeleteRecipe = async (id: number): Promise<PreviewRecipes> => {
  const recipe = await prisma.recipe.delete({
    where: { id },
    include: { ingredients: true, categories: true },
  });
  return recipe;
};

export const pgGetRecipesByCategory = async (
  categoryId: number,
  authorId?: number
): Promise<PreviewRecipes[]> => {
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
