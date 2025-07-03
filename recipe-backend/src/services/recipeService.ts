import Recipe, { IRecipe } from "../models/recipeModel";
import {
  createRecipeMongo,
  deleteRecipeMongo,
  getAllRecipesMongo,
  getRecipeByIdMongo,
  getRecipesByCategoryMongo,
  updateRecipeMongo,
} from "../DAL/recipesDAL";

export const getAllRecipesService = async () => {
  try {
    const recipes = await getAllRecipesMongo();
    return recipes;
  } catch (error) {
    throw new Error("Failed to fetch recipes:" + error);
  }
};

export const getRecipeByIdService = async (id: string) => {
  try {
    const recipe = await getRecipeByIdMongo(id);
    return recipe;
  } catch (error) {
    throw new Error("Failed to fetch recipe byId:" + error);
  }
};

export const createRecipeService = async (recipeData: IRecipe, userId: string) => {
  try {
    const newRecipe = await createRecipeMongo(recipeData, userId);
    return newRecipe;
  } catch (error) {
    throw new Error("Failed to create recipe:" + error);
  }
};

export const updateRecipeService = async (id: string, recipeData: IRecipe) => {
  try {
    const recipe = await updateRecipeMongo(id, recipeData);
    return recipe;
  } catch (error) {
    throw new Error("Failed to update recipe:" + error);
  }
};

export const deleteRecipeService = async (id: string) => {
  try {
    const recipe = await deleteRecipeMongo(id);
    return recipe;
  } catch (error) {
    throw new Error("Failed to delete recipe:" + error);
  }
};

export const getRecipesByCategoryService = async (category: string) => {
  try {
    const recipes = await getRecipesByCategoryMongo(category);
    return recipes;
  } catch (error) {
    throw new Error("Failed to fetch recipes by category:" + error);
  }
};
