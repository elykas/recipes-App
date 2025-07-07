import { Prisma } from "@prisma/client";
export type FullRecipe = Prisma.RecipeGetPayload<{
    include: {
        ingredients: true;
        categories: true
    };
}>;
