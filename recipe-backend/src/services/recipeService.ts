import {
  pgCreateRecipe,
  pgDeleteRecipe,
  pgGetAllRecipesName,
  pgGetAuthorsPublicIdsByRecipeIds,
  pgGetPreviewRecipes,
  pgGetPublicUserIdByPublicRecipeId,
  pgGetRecipeById,
  pgGetRecipesByCategory,
  pgGetRecipesByIds,
  pgUpdateRecipe,
  pgUpdateRecipeCategories,
} from "../dal/recipesDAL";
import {
  PreviewRecipeDto,
  RecipeResponseDTO,
  SearchRecipeDto,
} from "../dto/recipe.dto";
import { IRecipe } from "../models/recipeModel";
import {
  FullRecipe,
  PreviewRecipesResponse,
  SearchRecipeResponse,
} from "../types/responses";
import errorResponse from "../utils/errors/errors";
import {
  mapFullRecipeToDTO,
  mapPreviewRecipeToDto,
  mapSearchRecipeToDto,
} from "../utils/mappers/recipeMapper";
import { updateRecipeIngredientsService } from "./ingredientsService";
import { checkUserIsOwnerAndGetId, checkUserIsOwnerAndGetIds } from "../utils/checkUtils/checkUserUtils";

export const getAllRecipesNameService = async (
  searchQuery: string,
  publicAuthorId?: string
): Promise<SearchRecipeDto[]> => {
  const recipes: SearchRecipeResponse[] = await pgGetAllRecipesName(
    publicAuthorId,
    searchQuery
  );
  const recipesDto: SearchRecipeDto[] = recipes.map(mapSearchRecipeToDto);
  return recipesDto;
};

export const getPreviewRecipesService = async (
  userPublicId?: string,
  searchQuery?: string,
  cursor?: string,
  pageSize: number = 10
): Promise<PreviewRecipeDto[]> => {
  const previewRecipes: PreviewRecipesResponse[] = await pgGetPreviewRecipes(
    userPublicId,
    searchQuery,
    cursor,
    pageSize
  );
  const recipesDto: PreviewRecipeDto[] = previewRecipes.map(
    mapPreviewRecipeToDto
  );
  return recipesDto;
};

export const getPublicUserIdByRecipeIdService = async (
  recipePublicId: string
) => {
  const publicUserId = await pgGetPublicUserIdByPublicRecipeId(recipePublicId);
  if (!publicUserId) throw errorResponse("Recipe not found", 404);
  return publicUserId;
};

export const getAuthorsPublicIdsByRecipeIdsService = async (
  recipePublicIds: string[]
) => {
  const authorsPublicIds: (string | null)[] =
    await pgGetAuthorsPublicIdsByRecipeIds(recipePublicIds);
  return authorsPublicIds;
};

export const getRecipeByIdService = async (
  recipePublicId: string,
  currentUserPublicId: string
): Promise<RecipeResponseDTO> => {
  const targetUserPublicId: string =
    await getPublicUserIdByRecipeIdService(recipePublicId);

  const userId: number | undefined = await checkUserIsOwnerAndGetId(
    currentUserPublicId,
    targetUserPublicId
  );

  const recipe: FullRecipe | null = await pgGetRecipeById(
    recipePublicId,
    userId
  );
  if (!recipe) throw errorResponse("Recipe not found", 404);

  const recipeDto: RecipeResponseDTO = mapFullRecipeToDTO(recipe);
  return recipeDto;
};

export const getRecipesByIdsService = async (
  recipePublicIds: string[],
  currentUserPublicId: string
): Promise<RecipeResponseDTO[]> => {
  const targetUserPublicIds: (string | null)[] =
    await getAuthorsPublicIdsByRecipeIdsService(recipePublicIds);

  const userId: number | undefined = await checkUserIsOwnerAndGetIds(
    currentUserPublicId,
    targetUserPublicIds
  );

  const recipes: FullRecipe[] = await pgGetRecipesByIds(recipePublicIds, userId);

  const recipesDto: RecipeResponseDTO[] = recipes.map(mapFullRecipeToDTO);
  return recipesDto;
};

export const createRecipeService = async (
  recipeData: IRecipe,
  authorId: number
): Promise<RecipeResponseDTO> => {
  const newRecipe: FullRecipe = await pgCreateRecipe(recipeData, authorId);
  const recipeDto: RecipeResponseDTO = mapFullRecipeToDTO(newRecipe);
  return recipeDto;
};

export const updateRecipeService = async (
  recipeData: IRecipe,
  recipeId: number
) => {
  const { categories, ingredients, ...pureRecipeData } = recipeData;
  if (!recipeId) throw new Error("Recipe ID is required");

  if (recipeData.categories) {
    await pgUpdateRecipeCategories(recipeId, categories);
  }

  if (recipeData.ingredients) {
    await updateRecipeIngredientsService(recipeId, ingredients);
  }
  const recipe: PreviewRecipesResponse = await pgUpdateRecipe(pureRecipeData);
  const recipeDto: RecipeResponseDTO = mapFullRecipeToDTO(recipe);
  return recipeDto;
};

export const deleteRecipeService = async (
  id: number
): Promise<RecipeResponseDTO> => {
  const recipe: PreviewRecipesResponse = await pgDeleteRecipe(id);
  const recipeDto: RecipeResponseDTO = mapFullRecipeToDTO(recipe);
  return recipeDto;
};

export const getUserRecipesByCategoryService = async (
  categoryId: number,
  authorId: number
): Promise<RecipeResponseDTO[]> => {
  const recipes: PreviewRecipesResponse[] = await pgGetRecipesByCategory(
    categoryId,
    authorId
  );
  const recipesDto: RecipeResponseDTO[] = recipes.map(mapFullRecipeToDTO);
  return recipesDto;
};

export const getRecipesByCategoryService = async (
  categoryId: number
): Promise<RecipeResponseDTO[]> => {
  const recipes: PreviewRecipesResponse[] =
    await pgGetRecipesByCategory(categoryId);
  const recipesDto: RecipeResponseDTO[] = recipes.map(mapFullRecipeToDTO);
  return recipesDto;
};
