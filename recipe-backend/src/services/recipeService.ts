import prisma from "../config/database";
import {
  pgCreateRecipe,
  pgDeleteRecipe,
  pgGetAuthorsPublicIdsByRecipeIds,
  pgGetImageOfRecipeByPublicId,
  pgGetPreviewRecipes,
  pgGetPreviewRecipesByCategory,
  pgGetPublicUserIdByPublicRecipeId,
  pgGetRecipeById,
  pgGetRecipesByIds,
  pgGetRecipesName,
  pgUpdateRecipe,
  pgUpdateRecipeCategories,
  pgUpdateRecipeImage,
} from "../dal/recipesDAL";
import {
  ImageRecipeDto,
  PreviewRecipeDto,
  RecipeIdDto,
  RecipeResponseDto,
  SearchRecipeDto,
} from "../dto/recipeDto";
import { IRecipe } from "../models/recipeModel";
import {
  FullRecipeResponse,
  PreviewRecipesResponse,
  RecipeIdResonse,
  RecipeImageResponse,
  SearchRecipeResponse,
} from "../types/responses";
import {
  checkUserIsOwnerAndGetId,
  checkUserIsOwnerAndGetIds as checkUserIsOwnerByIds,
} from "../utils/checkUtils/checkUserUtils";
import errorResponse from "../utils/errors/errors";
import {
  mapFullRecipeToDTO,
  mapPreviewRecipeToDto,
  mapSearchRecipeToDto,
} from "../utils/mappers/recipeMapper";
import { updateRecipeIngredientsService } from "./ingredientsService";
import { updateRecipeStepsService } from "./stepsService";
import { deleteImageFromStorage, uploadSingleImage } from "./storageService";

export const getRecipesNameService = async (
  searchQuery: string,
  publicAuthorId?: string
): Promise<SearchRecipeDto[]> => {
  const recipes: SearchRecipeResponse[] = await pgGetRecipesName(
    searchQuery,
    publicAuthorId
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
): Promise<string> => {
  const publicUserId: string | null = await pgGetPublicUserIdByPublicRecipeId(recipePublicId);
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
): Promise<RecipeResponseDto> => {
  const targetUserPublicId: string =
    await getPublicUserIdByRecipeIdService(recipePublicId);

  const userId: number | undefined = await checkUserIsOwnerAndGetId(
    currentUserPublicId,
    targetUserPublicId
  );

  const recipe: FullRecipeResponse | null = await pgGetRecipeById(
    recipePublicId,
    userId
  );
  if (!recipe) throw errorResponse("Recipe not found", 404);

  const recipeDto: RecipeResponseDto = mapFullRecipeToDTO(recipe);
  return recipeDto;
};

export const getSomeRecipesByIdsService = async (
  recipePublicIds: string[],
  currentUserPublicId: string
): Promise<RecipeResponseDto[]> => {
  const targetUserPublicIds: (string | null)[] =
    await getAuthorsPublicIdsByRecipeIdsService(recipePublicIds);

  const userId: number | undefined = await checkUserIsOwnerByIds(
    currentUserPublicId,
    targetUserPublicIds
  );

  const recipes: FullRecipeResponse[] = await pgGetRecipesByIds(
    recipePublicIds,
    userId
  );

  const recipesDto: RecipeResponseDto[] = recipes.map(mapFullRecipeToDTO);
  return recipesDto;
};

export const createRecipeService = async (
  recipeData: IRecipe,
  image: any,
  publicUserId: string
): Promise<RecipeIdDto> => {
  let imageUrl: string | undefined = undefined;
  if (image) {
    const imagePath: string = await uploadSingleImage(
      image.image,
      publicUserId,
      image.image.mimetype,
      "recipe"
    );
    imageUrl = imagePath;
  }

  const newRecipe: RecipeIdResonse = await pgCreateRecipe(
    recipeData,
    publicUserId,
    imageUrl
  );
  const newRecipeDto: RecipeIdDto = {
    publicId: newRecipe.publicId,
  };
  return newRecipeDto;
};

export const updateRecipeService = async (
  recipeData: IRecipe,
  publicRecipeId: string
) => {
  const { categories, ingredients, steps, ...pureRecipeData } = recipeData;

  if (!publicRecipeId) throw new Error("Recipe ID is required");

  const updatedRecipe = await prisma.$transaction(async (tx) => {
    if (categories && categories.length) {
      await pgUpdateRecipeCategories(publicRecipeId, categories, tx);
    }

    if (ingredients && ingredients.length) {
      await updateRecipeIngredientsService(publicRecipeId, ingredients, tx);
    }

    if (steps && steps.length) {
      await updateRecipeStepsService(publicRecipeId, steps, tx);
    }

    const recipe: FullRecipeResponse = await pgUpdateRecipe(
      pureRecipeData,
      publicRecipeId,
      tx
    );

    return recipe;
  });

  const recipeDto: RecipeResponseDto = mapFullRecipeToDTO(updatedRecipe);
  return recipeDto;
};

export const deleteRecipeService = async (
  publicRecipeId: string
): Promise<RecipeIdDto> => {
  const recipe: RecipeIdResonse = await pgDeleteRecipe(publicRecipeId);
  const recipeIdDto: RecipeIdDto = {
    publicId: recipe.publicId,
  };
  return recipeIdDto;
};

export const updateRecipeImageService = async (
  publicRecipeId: string,
  publicUserId: string,
  image?: any
): Promise<ImageRecipeDto> => {
  let imageUrl: string | undefined = undefined;
  if (image) {
    const imagePath: string = await uploadSingleImage(
      image.image,
      publicUserId,
      image.image.mimetype,
      "recipe"
    );
    imageUrl = imagePath;
  }
  const updatedImage: RecipeImageResponse = await pgUpdateRecipeImage(
    publicRecipeId,
    imageUrl
  );

  const oldImagePath: string =
    await pgGetImageOfRecipeByPublicId(publicRecipeId);
  if (oldImagePath) {
    await deleteImageFromStorage(oldImagePath);
  }

  const imageRecipeDto: ImageRecipeDto = {
    imageUrl: updatedImage.imageUrl,
  };
  return imageRecipeDto;
};

export const getRecipesPreviewByCategoryService = async (
  categoryId: number,
  cursor?: string,
  pageSize: number = 10,
  publicUserId?: string
): Promise<PreviewRecipeDto[]> => {
  const recipes: PreviewRecipesResponse[] = await pgGetPreviewRecipesByCategory(
    categoryId,
    cursor,
    pageSize,
    publicUserId
  );

  const recipesDto: PreviewRecipeDto[] = recipes.map(mapPreviewRecipeToDto);

  return recipesDto;
};
