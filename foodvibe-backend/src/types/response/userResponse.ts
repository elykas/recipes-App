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

export type UpdateUserImageResponse = Prisma.UserGetPayload<{
  select: {
    publicId: true;
    imageUrl: true;
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

export type UserProfileWithPostsResponse = Prisma.UserGetPayload<{
  select: {
    publicId: true;
    username: true;
    fullName: true;
    imageUrl: true;
    email?: true;
    bio: true;
    headLine: true;
    locale?: true;
    isAdmin?: true;
    posts: {
      select: {
        publicId: true;
        imageUrl: true;
        likes: true;
        recipe: {
          select: {
            publicId: true;
          };
        };
      };
      orderBy: { createdAt: "desc" };
      take: 10;
    };
  };
}>;
