import Recipe, { IRecipe } from "../models/recipeModel";
import {
  pgCreateRecipe, pgDeleteRecipe, pgGetAllRecipes, pgGetRecipeById, pgGetRecipesByCategory, pgUpdateRecipe, 
} from "../DAL/recipesDAL";

export const getAllRecipesService = async (authorId?: number) => {
  try {
    const recipes = await pgGetAllRecipes(authorId);
    return recipes;
  } catch (error) {
    throw new Error("Failed to fetch recipes:" + error);
  }
};

export const getRecipeByIdService = async (id: number) => {
  try {
    const recipe = await pgGetRecipeById(id);
    return recipe;
  } catch (error) {
    throw new Error("Failed to fetch recipe byId:" + error);
  }
};

export const createRecipeService = async (recipeData: IRecipe, authorId: number) => {
  try {
    const newRecipe = await pgCreateRecipe(recipeData, authorId);
    return newRecipe;
  } catch (error) {
    throw new Error("Failed to create recipe:" + error);
  }
};

export const updateRecipeService = async (id: number, recipeData: Partial<IRecipe>) => {
  try {
    const recipe = await pgUpdateRecipe(id, recipeData);
    return recipe;
  } catch (error) {
    throw new Error("Failed to update recipe:" + error);
  }
};

export const deleteRecipeService = async (id: number) => {
  try {
    const recipe = await pgDeleteRecipe(id);
    return recipe;
  } catch (error) {
    throw new Error("Failed to delete recipe:" + error);
  }
};

export const getRecipesByCategoryService = async (category: string, auhtorId?: number) => {
  try {
    const recipes = await pgGetRecipesByCategory(category, auhtorId);
    return recipes;
  } catch (error) {
    throw new Error("Failed to fetch recipes by category:" + error);
  }
};
