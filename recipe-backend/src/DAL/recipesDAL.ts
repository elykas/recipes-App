import { IRecipe } from "../models/recipeModel";
import prisma from "../config/database"


export const pgGetAllRecipes = async (authorId?: number) => {
    try {
        const recipes = await prisma.recipe.findMany({
            where: authorId ? { authorId } : undefined,
            orderBy: { createdAt: 'desc' }
        });
        return recipes;
    } catch (error) {
        throw new Error("Failed to fetch recipes: " + error);
    }
};

export const pgGetRecipeById = async (id: number) => {
    try {
        const recipe = await prisma.recipe.findUnique({
            where: { id },
        });
        return recipe;
    } catch (error) {
        throw new Error("Failed to fetch recipe by id: " + error);
    }
};

export const pgCreateRecipe = async (recipeData: IRecipe, authorId: number) => {
       try {
        const newRecipe = await prisma.recipe.create({
            data: {
                ...recipeData,
                authorId
            },
        });
        return newRecipe;
    } catch (error) {
        throw new Error("Failed to create recipe on the postgres database: " + error);
    }
};

export const pgUpdateRecipe = async (id: number, recipeData: Partial<IRecipe>) => {
    try {
        const recipe = await prisma.recipe.update({
            where: { id },
            data: recipeData,
        });
        return recipe;
    } catch (error) {
        throw new Error("Failed to update recipe: " + error);
    }
};

export const pgDeleteRecipe = async (id: number) => {
    try {
        const recipe = await prisma.recipe.delete({
            where: { id },
        });
        return recipe;
    } catch (error) {
        throw new Error("Failed to delete recipe: " + error);
    }
};

export const pgGetRecipesByCategory = async (category: string, authorId?: number) => {
    try {
        const recipes = await prisma.recipe.findMany({
            where: {
                category: { has: category },
                ...(authorId ? { authorId } : {}),
            },
            orderBy: { createdAt: 'desc' }
        });
        return recipes;
    } catch (error) {
        throw new Error("Failed to fetch recipes by category: " + error);
    }
};

