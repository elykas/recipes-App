import { Prisma } from "@prisma/client";
import prisma from "../config/database";
import { ICategory, IRecipe } from "../models/recipeModel";
import {
  FullRecipeResponse,
  PreviewRecipesResponse,
  RecipeIdResonse,
  RecipeImageResponse,
  SearchRecipeResponse,
} from "../types/responses";

export const pgGetRecipesName = async (
  searchQuery: string,
  publicAuthorId?: string
): Promise<SearchRecipeResponse[]> => {
  const recipes: SearchRecipeResponse[] = await prisma.recipe.findMany({
    where: {
      ...(publicAuthorId && { author: { publicId: publicAuthorId } }),
      ...(!publicAuthorId && { isPublic: true }),
      ...(searchQuery && {
        title: {
          contains: searchQuery,
          mode: "insensitive",
        },
      }),
    },
    select: {
      publicId: true,
      title: true,
      isPublic: true,
    },
    orderBy: { createdAt: "desc" },
    take: 5,
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
  userPublicId?: string,
  searchQuery?: string,
  cursor?: string,
  pageSize: number = 10
): Promise<PreviewRecipesResponse[]> => {
  const recipesPreview = await prisma.recipe.findMany({
    where: {
      ...(userPublicId && { author: { publicId: userPublicId } }),
      ...(!userPublicId && { isPublic: true }),
      ...(searchQuery && {
        title: {
          contains: searchQuery,
          mode: "insensitive",
        },
      }),
    },
    select: {
      title: true,
      publicId: true,
      imageUrl: true,
      isPublic: true,
      categories: true,
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

export const pgGetPublicUserIdByPublicRecipeId = async (
  publicId: string
): Promise<string | null> => {
  const userId = await prisma.recipe.findUnique({
    where: { publicId },
    select: { author: { select: { publicId: true } } },
  });
  return userId?.author?.publicId ?? null;
};

export const pgGetAuthorsPublicIdsByRecipeIds = async (
  recipePublicIds: string[]
): Promise<(string | null)[]> => {
  const recipes = await prisma.recipe.findMany({
    where: { publicId: { in: recipePublicIds } },
    select: {
      publicId: true,
      author: {
        select: {
          publicId: true,
        },
      },
    },
  });

  const recipeMap = new Map(
    recipes.map((r) => [r.publicId, r.author?.publicId ?? null])
  );
  return recipePublicIds.map((id) => recipeMap.get(id) ?? null);
};

export const pgGetRecipeById = async (
  recipePublicId: string,
  userId?: number
): Promise<FullRecipeResponse | null> => {
  const recipe: FullRecipeResponse | null = await prisma.recipe.findUnique({
    where: { publicId: recipePublicId, ...(userId ? {} : { isPublic: true }) },
    include: {
      author: {
        select: {
          publicId: true,
        },
      },
      ingredients: true,
      categories: true,
      steps: true,
      likes: true,
      ...(userId
        ? {
            favoriteRecipe: {
              where: { userId },
              select: { id: true },
            },
          }
        : {}),
    },
  });
  return recipe;
};

export const pgGetRecipesByIds = async (
  publicIds: string[],
  userId?: number
): Promise<FullRecipeResponse[]> => {
  const recipes = await prisma.recipe.findMany({
    where: {
      publicId: { in: publicIds },
      ...(userId ? {} : { isPublic: true }),
    },
    include: {
      author: {
        select: {
          publicId: true,
        },
      },
      ingredients: true,
      categories: true,
      steps: true,
      likes: true,
      ...(userId
        ? {
            favoriteRecipe: {
              where: { userId },
              select: { id: true },
            },
          }
        : {}),
    },
  });
  return recipes;
};

export const pgCreateRecipe = async (
  recipeData: IRecipe,
  publicAuthorId: string,
  imageUrl: string
): Promise<RecipeIdResonse> => {
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
          duration: step.duration,
          order: step.order,
        })),
      },
      difficulty: recipeData.difficulty,
      isPublic: recipeData.isPublic,
      prepTime: recipeData.prepTime,
      imageUrl,
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
    select: {
      publicId: true,
    },
  });
  return newRecipe;
};

//NOTE: when create a recipe need to add the order step for each step
export const pgUpdateRecipe = async (
  recipeData: Partial<IRecipe>,
  publicRecipeId: string,
  tx: Prisma.TransactionClient
): Promise<FullRecipeResponse> => {
  const updatedRecipe = await prisma.recipe.update({
    where: { publicId: publicRecipeId },
    data: {
      title: recipeData.title,
      tip: recipeData.tip,
      description: recipeData.description,
      difficulty: recipeData.difficulty,
      isPublic: recipeData.isPublic,
      prepTime: recipeData.prepTime,
    },
    include: {
      ingredients: true,
      categories: true,
      steps: true,
      likes: true,
      favoriteRecipe: {
        select: { id: true },
      },
      author: {
        select: {
          publicId: true,
        },
      },
    },
  });
  return updatedRecipe;
};

export const pgUpdateRecipeCategories = async (
  publicRecipeId: string,
  categories: ICategory[],
  tx: Prisma.TransactionClient
): Promise<void> => {
  await tx.recipe.update({
    where: { publicId: publicRecipeId },
    data: {
      categories: {
        set: categories.map((category) => ({
          id: category.id,
        })),
      },
    },
  });
};

export const pgDeleteRecipe = async (
  publiRecipeId: string
): Promise<RecipeIdResonse> => {
  const recipe = await prisma.recipe.delete({
    where: { publicId: publiRecipeId },
    select: {
      publicId: true,
    },
  });
  return recipe;
};

export const pgGetImageOfRecipeByPublicId = async (
  publicId: string
): Promise<string> => {
  const user = await prisma.recipe.findUnique({
    where: { publicId },
    select: { imageUrl: true },
  });
  return user?.imageUrl ?? "";
};

export const pgUpdateRecipeImage = async (
  publicRecipeId: string,
  imageUrl: string
): Promise<RecipeImageResponse> => {
  const updatedImage = await prisma.recipe.update({
    where: { publicId: publicRecipeId },
    data: {
      imageUrl,
    },
    select: {
      imageUrl: true,
    },
  });
  return updatedImage;
};

export const pgGetPreviewRecipesByCategory = async (
  categoryId: number,
  cursor?: string,
  pageSize: number = 10,
  publicAuthorId?: string
): Promise<PreviewRecipesResponse[]> => {
  const recipes = await prisma.recipe.findMany({
    where: {
      ...(publicAuthorId && { author: { publicId: publicAuthorId } }),
      ...(!publicAuthorId && { isPublic: true }),
      categories: {
        some: {
          id: categoryId,
        },
      },
    },
    select: {
      title: true,
      publicId: true,
      imageUrl: true,
      isPublic: true,
      categories: true,
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
  return recipes;
};
