import { Prisma } from "@prisma/client";
export type FullRecipeResponse = Prisma.RecipeGetPayload<{
  include: {
    ingredients: true;
    categories: true;
    steps: true;
    likes: true;
    author: {
      select: { publicId: true };
    };
    favoriteRecipe: {
      select: { id: true };
    };
  };
}>;

export type SearchRecipeResponse = Prisma.RecipeGetPayload<{
  select: {
    publicId: true;
    title: true;
    isPublic: true;
  };
}>;

export type PreviewRecipesResponse = Prisma.RecipeGetPayload<{
  select: {
    title: true;
    publicId: true;
    imageUrl: true;
    categories: true;
    isPublic: true;
    likeCount: true;
  };
}>;

export type RecipeIdResponse = Prisma.RecipeGetPayload<{
  select: {
    publicId: true;
  };
}>;

export type CheckImageResponse = Prisma.RecipeGetPayload<{
  select: {
    imageUrl: true;
    author: {
      select: { publicId: true };
    }
  };
}>;

export type RecipeImageResponse = Prisma.RecipeGetPayload<{
  select: {
    imageUrl: true;
    publicId: true;
  };
}>;

export type CategoriesResponse = Prisma.CategoryGetPayload<{
  select: {
    id: true;
    name: true;
    type: true;
  };
}>;

export type RecipeLikeResponse = Prisma.RecipeLikeGetPayload<{
  select: {
    recipe:{
      select: {
        publicId: true;
      }
    }
  }
}>;
