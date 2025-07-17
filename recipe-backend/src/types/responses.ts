import { Prisma } from "@prisma/client";
export type FullRecipe = Prisma.RecipeGetPayload<{
    include: {
        ingredients: true;
        categories: true
        steps: true
        likes: true
    };
}>;


export type UserWithRecipes = Prisma.UserGetPayload<{
    include: {
        recipes: {
            include: {
                ingredients: true;
                categories: true;
                steps: true;
                favoriteRecipe: true
            };
        
        },
        posts:{
        
        },
        favoriteRecipes: {
            include: {
                recipe: {
                    include: {
                        ingredients: true;
                        categories: true;
                        steps: true;
                    }
                }
            }
        }

    }
}>

export type UserWithoutRecipes = Prisma.UserGetPayload<{
    include: {
        recipes: false
    }
}>