import { Prisma } from "@prisma/client";

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

export type UsernamesResponse = Prisma.UserGetPayload<{
  select: {
    username: true;
    publicId: true;
    fullName: true;
    imageUrl: true;
  };
}>[];

export type UserWithoutRecipes = Prisma.UserGetPayload<{
  include: {
    recipes: false;
  };
}>;
