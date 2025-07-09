import { Prisma } from "@prisma/client";
export type FullRecipe = Prisma.RecipeGetPayload<{
    include: {
        ingredients: true;
        categories: true
    };
}>;


export type UserWithRecipes = Prisma.UserGetPayload<{
    include: {
        recipes: {
            include: {
                ingredients: true;
                categories: true
            };
        }

    }
}>

export type UserWithoutRecipes = Prisma.UserGetPayload<{
    include: {
        recipes: false
    }
}>