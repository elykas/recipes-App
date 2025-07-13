import {
  pgCreateRecipe,
  pgDeleteRecipe,
  pgGetAllRecipes,
  pgGetRecipeById,
  pgGetRecipesByCategory,
  pgUpdateRecipe,
  pgUpdateRecipeCategories,
} from "../dal/recipesDAL";
import { RecipeResponseDTO } from "../dto/recipe.dto";
import { IRecipe } from "../models/recipeModel";
import { FullRecipe } from "../types/responses";
import { mapRecipeToDTO } from "../utils/mappers/recipeMapper";
import errorResponse from "../utils/errors/errors";
import { updateRecipeIngredientsService } from "./ingredientsService";

export const getAllRecipesFromUserService = async (
  authorId: number
): Promise<RecipeResponseDTO[]> => {
  const recipes: FullRecipe[] = await pgGetAllRecipes(authorId);
  const recipesDto: RecipeResponseDTO[] = recipes.map(mapRecipeToDTO);
  return recipesDto;
};

export const getAllRecipesService = async (): Promise<RecipeResponseDTO[]> => {
  const recipes: FullRecipe[] = await pgGetAllRecipes();
  const recipesDto: RecipeResponseDTO[] = recipes.map(mapRecipeToDTO);
  return recipesDto;
};

export const getRecipeByIdService = async (
  id: number
): Promise<RecipeResponseDTO | null> => {
  const recipe: FullRecipe | null = await pgGetRecipeById(id);
  if (!recipe) throw errorResponse("Recipe not found", 404);

  const recipeDto: RecipeResponseDTO = mapRecipeToDTO(recipe);
  return recipeDto;
};

export const createRecipeService = async (
  recipeData: IRecipe,
  authorId: number
): Promise<RecipeResponseDTO> => {
  const newRecipe: FullRecipe = await pgCreateRecipe(recipeData, authorId);
  const recipeDto: RecipeResponseDTO = mapRecipeToDTO(newRecipe);
  return recipeDto;
};

export const updateRecipeService = async (recipeData: IRecipe, recipeId: number) => {
  const {categories, ingredients, ...pureRecipeData } = recipeData;
  if (!recipeId) throw new Error("Recipe ID is required");

  if (recipeData.categories) {
    await pgUpdateRecipeCategories(recipeId, categories);
  }

  if (recipeData.ingredients) {
    await updateRecipeIngredientsService(recipeId, ingredients);
  }
  const recipe: FullRecipe = await pgUpdateRecipe(pureRecipeData);
  const recipeDto: RecipeResponseDTO = mapRecipeToDTO(recipe);
  return recipeDto;
};

export const deleteRecipeService = async (id: number): Promise<RecipeResponseDTO> => {
  const recipe: FullRecipe = await pgDeleteRecipe(id);
  const recipeDto: RecipeResponseDTO = mapRecipeToDTO(recipe);
  return recipeDto;
};

export const getUserRecipesByCategoryService = async (
  categoryId: number,
  authorId: number
): Promise<RecipeResponseDTO[]> => {
  const recipes: FullRecipe[] = await pgGetRecipesByCategory(
    categoryId,
    authorId
  );
  const recipesDto: RecipeResponseDTO[] = recipes.map(mapRecipeToDTO);
  return recipesDto;
};

export const getRecipesByCategoryService = async (
  categoryId: number
): Promise<RecipeResponseDTO[]> => {
  const recipes: FullRecipe[] = await pgGetRecipesByCategory(categoryId);
  const recipesDto: RecipeResponseDTO[] = recipes.map(mapRecipeToDTO);
  return recipesDto;
};
