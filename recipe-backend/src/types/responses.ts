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
    _count: {
      select: {
        likes: true;
      };
    };
  };
}>;

export type UserWithRecipes = Prisma.UserGetPayload<{
  include: {
    recipes: {
      include: {
        ingredients: true;
        categories: true;
        steps: true;
        favoriteRecipe: true;
      };
    };
    posts: {};
    favoriteRecipes: {
      include: {
        recipe: {
          include: {
            ingredients: true;
            categories: true;
            steps: true;
          };
        };
      };
    };
  };
}>;

export type UserWithoutRecipes = Prisma.UserGetPayload<{
  include: {
    recipes: false;
  };
}>;

export type RecipeIdResonse = Prisma.RecipeGetPayload<{
  select: {
    publicId: true;
  };
}>;

export type RecipeImageResponse = Prisma.RecipeGetPayload<{
  select: {
    imageUrl: true;
  };
}>;

export type CategoriesResponse = Prisma.CategoryGetPayload<{
  select: {
    id: true;
    name: true;
    type: true;
  };
}>;