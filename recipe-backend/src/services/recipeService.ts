import {
  pgCreateRecipe,
  pgDeleteRecipe,
  pgGetAllRecipes,
  pgGetRecipeById,
  pgGetRecipesByCategory,
  pgUpdateRecipe,
} from "../dal/recipesDAL";
import { RecipeResponseDTO } from "../dto/recipe.dto";
import { IRecipe } from "../models/recipeModel";
import { FullRecipe } from "../types/responses";
import { mapRecipeToDTO } from "../utils/mappers/recipeMapper";

export const getAllRecipesFromUserService = async (
  authorId: number
): Promise<RecipeResponseDTO[]> => {
  try {
    const recipes: FullRecipe[] = await pgGetAllRecipes(authorId);
    const recipesDto: RecipeResponseDTO[] = recipes.map(mapRecipeToDTO);
    return recipesDto;
  } catch (error) {
    throw new Error("Failed to fetch recipes:" + error);
  }
};

export const getRecipeByIdService = async (
  id: number
): Promise<RecipeResponseDTO | null> => {
  try {
    const recipe: FullRecipe | null = await pgGetRecipeById(id);
    if (!recipe) return null;

    const recipeDto: RecipeResponseDTO = mapRecipeToDTO(recipe);
    return recipeDto;
  } catch (error) {
    throw new Error("Failed to fetch recipe byId:" + error);
  }
};

export const createRecipeService = async (
  recipeData: IRecipe,
  authorId: number
) : Promise<RecipeResponseDTO> => {
  try {
    const newRecipe = await pgCreateRecipe(recipeData, authorId);
    const recipeDto: RecipeResponseDTO = mapRecipeToDTO(newRecipe);
    return recipeDto;
  } catch (error) {
    throw new Error("Failed to create recipe:" + error);
  }
};

export const updateRecipeService = async (
  id: number,
  recipeData: Partial<IRecipe>
) => {
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

export const getRecipesByCategoryService = async (
  category: string,
  auhtorId?: number
) => {
  try {
    const recipes = await pgGetRecipesByCategory(category, auhtorId);
    return recipes;
  } catch (error) {
    throw new Error("Failed to fetch recipes by category:" + error);
  }
};
