import { title } from "process";
import prisma from "../config/database";
import { ICategory, IRecipe } from "../models/recipeModel";
import { FullRecipe, PreviewRecipes } from "../types/responses";

export const pgGetAllRecipes = async (
  publicId?: string
): Promise<Partial<FullRecipe>[]> => {
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

export const pgGetRecipeIdByPublicId = async (
  publicId: string
): Promise<number | null> => {
  const recipeId = await prisma.recipe.findUnique({
    where: { publicId },
    select: { id: true },
  });
  return recipeId?.id ?? null;
};

export const pgGetPreviewRecipes = async (
  currentUserPublicId: string,
  targetUserPublicId: string,
  searchQuery?: string,
  cursor?: string,
  pageSize: number = 10
): Promise<PreviewRecipes[]> => {
  const isOwner = currentUserPublicId === targetUserPublicId;

  const recipesPreview = await prisma.recipe.findMany({
    where: {
      author: { publicId: targetUserPublicId },
      ...(isOwner ? {} : { isPublic: true }),
      ...(searchQuery
        ? {
            title: {
              contains: searchQuery,
              mode: "insensitive",
            },
          }
        : {}),
    },
    select: {
      title: true,
      publicId: true,
      imageUrl: true,
      categories: {
        select: { name: true },
      },
      _count: {
        select: { likes: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: pageSize,
    ...(cursor && {
      cursor: { publicId: cursor },
      skip: 1,
    }),
  });

  return recipesPreview;
};

export const pgGetRecipeById = async (
  publicId: string
): Promise<FullRecipe | null> => {
  const recipe: FullRecipe | null = await prisma.recipe.findUnique({
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

export const pgGetRecipesByIds = async (
  publicIds: string[]
): Promise<FullRecipe[]> => {
  const recipes = await prisma.recipe.findMany({
    where: {
      publicId: {
        in: publicIds,  
      },
    },
    include: {
      ingredients: true,
      categories: true,
      steps: true,
      likes: true,
    },
  });
  return recipes;
};

//NOTE: when create a recipe need to add the order step for each step
export const pgCreateRecipe = async (
  recipeData: IRecipe,
  publicAuthorId: string
): Promise<FullRecipe> => {
  const newRecipe = await prisma.recipe.create({
    data: {
      title: recipeData.title,
      categories: {
        connect: recipeData.categories.map((category) => ({
          id: category.id,
        })),
      },
      steps: {
        create: recipeData.steps.map((step) => ({
          title: step.title,
          description: step.description,
          imageUrl: step.imageUrl,
          duration: step.duration,
          order: step.order,
        })),
      },
      difficulty: recipeData.difficulty,
      isPublic: recipeData.isPublic,
      prepTime: recipeData.prepTime,
      imageUrl: recipeData.imageUrl,
      description: recipeData.description,
      tip: recipeData.tip,
      author: {
        connect: {
          publicId: publicAuthorId,
        },
      },
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
      steps: true,
      likes: true,
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
      : recipeData.name,
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
