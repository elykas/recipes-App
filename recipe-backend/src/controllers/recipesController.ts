import { NextFunction, Request, Response } from "express";
import { CategoryDto } from "../dto/categoryDto";
import {
  ImageRecipeDto,
  PreviewRecipeDto,
  RecipeIdDto,
  RecipeResponseDto,
  SearchRecipeDto,
} from "../dto/recipeDto";
import IRecipe from "../models/recipeModel";
import { getCategoriesNameService } from "../services/categoriesService";
import {
  createRecipeService,
  deleteRecipeService,
  getPreviewRecipesService,
  getRecipeByIdService,
  getRecipesNameService,
  getRecipesPreviewByCategoryService,
  getSomeRecipesByIdsService,
  updateRecipeImageService,
  updateRecipeService,
} from "../services/recipeService";
import { AuthenticatedRequest } from "../types/requests";

export const getRecipesName =
  (isUserScoped: boolean) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { publicId } = req as AuthenticatedRequest;
      const searchQuery = req.query.query as string;
      const onlyRecipes = req.query.onlyRecipes === "true";

      const recipes: SearchRecipeDto[] = await getRecipesNameService(
        searchQuery,
        isUserScoped ? publicId : undefined
      );
      const categories: CategoryDto[] | false =
        !onlyRecipes && (await getCategoriesNameService(searchQuery));

      const data = onlyRecipes ? recipes : { recipes, categories };

      res.status(200).json({
        data,
        success: true,
        message: onlyRecipes
          ? "Recipes fetched successfully"
          : "Recipes and categories fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  };

export const getPreviewRecipes =
  (isUserScoped: boolean) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { publicId: userPublicId } = req as AuthenticatedRequest;
      const searchQuery = req.query.query as string;
      const cursor = req.query.cursor as string | undefined;
      const pageSize = parseInt(req.query.pageSize as string) || 10;

      const recipes: PreviewRecipeDto[] = await getPreviewRecipesService(
        isUserScoped ? userPublicId : undefined,
        searchQuery,
        cursor,
        pageSize
      );

      res.status(200).json({
        data: recipes,
        success: true,
        message: "Recipes fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  };

export const getRecipeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipeId } = req.params;
    const { publicId: userPublicId } = req as AuthenticatedRequest;
    const recipe: RecipeResponseDto = await getRecipeByIdService(
      recipeId,
      userPublicId
    );
    res.status(200).json({
      data: recipe,
      success: true,
      message: "Recipe by Id fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getSomeRecipesById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipesId } = req.body;
    const { publicId: userPublicId } = req as AuthenticatedRequest;
    const recipe: RecipeResponseDto[] = await getSomeRecipesByIdsService(
      recipesId,
      userPublicId
    );
    res.status(200).json({
      data: recipe,
      success: true,
      message: "Recipe by Id fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipe: IRecipe = JSON.parse(req.body.recipe);
    const { publicId } = req as AuthenticatedRequest;
    const imageFile = req.file;

    const newRecipe: RecipeIdDto = await createRecipeService(
      recipe,
      imageFile,
      publicId
    );

    res.status(201).json({
      data: newRecipe,
      success: true,
      message: "Recipe created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const editRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipeId } = req.params;
    const recipe: IRecipe = req.body.recipe;

    const updatedRecipe: RecipeResponseDto = await updateRecipeService(
      recipe,
      recipeId
    );
    res.status(200).json({
      data: updatedRecipe,
      success: true,
      message: "Recipe updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipeId } = req.params;
    const deletedRecipe: RecipeIdDto = await deleteRecipeService(recipeId);
    res.status(200).json({
      data: deletedRecipe,
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const editRecipeImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipeId: publicRecipeId } = req.params;
    const { publicId: publicUserId } = req as AuthenticatedRequest;
    const imageFile = req.file;
    const imageRecipe: ImageRecipeDto = await updateRecipeImageService(
      publicRecipeId,
      publicUserId,
      imageFile
    );
    res.status(200).json({
      data: imageRecipe,
      success: true,
      message: "Recipe image updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getRecipesPreviewByCategory =
  (isUserScoped: boolean) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { categoryId } = req.params;
      const { publicId: userPublicId } = req as AuthenticatedRequest;
      const cursor = req.query.cursor as string | undefined;
      const pageSize = Number(req.query.pageSize) || 10;

      if (!categoryId) {
        throw new Error("Category id is required");
      }

      const recipes = await getRecipesPreviewByCategoryService(
        +categoryId,
        cursor,
        pageSize,
        isUserScoped ? userPublicId : undefined
      );
      res.status(200).json({
        data: recipes,
        success: true,
        message: "Recipes by category fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  };
