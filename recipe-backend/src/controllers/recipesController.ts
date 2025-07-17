import { NextFunction, Request, Response } from "express";
import { RecipeResponseDTO } from "../dto/recipe.dto";
import IRecipe from "../models/recipeModel";
import {
  deleteRecipeService,
  getAllRecipesOfUserService,
  getAllRecipesService,
  getRecipeByIdService,
  getRecipesByCategoryService,
  getUserRecipesByCategoryService,
} from "../services/recipeService";
import {} from "../services/storageService";
import { AuthenticatedRequest } from "../types/requests";

export const getAllRecipesOfUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { publicId } = req as AuthenticatedRequest;
    const recipes: RecipeResponseDTO[] =
      await getAllRecipesOfUserService(publicId);
    res.status(200).json({
      data: recipes,
      success: true,
      message: "Recipes of user fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipes: RecipeResponseDTO[] = await getAllRecipesService();
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
    const recipe: RecipeResponseDTO | null =
      await getRecipeByIdService(+recipeId);
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
    const recipe: IRecipe = req.body;
    const { userId } = req as AuthenticatedRequest;

    const files = req.files as {
      images?: Express.Multer.File[];
      video?: Express.Multer.File[];
    };

    const newRecipe: RecipeResponseDTO = await createRecipeWithMediaService(
      recipe,
      userId,
      files
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
    const { userId } = req as AuthenticatedRequest;
    const recipe: IRecipe = req.body;
    const files = req.files as {
      images?: Express.Multer.File[];
      video?: Express.Multer.File[];
    };

    const updatedRecipe = await updateRecipeWithMediaService(
      +recipeId,
      recipe,
      userId,
      files
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
    const deletedRecipe: RecipeResponseDTO =
      await deleteRecipeService(+recipeId);
    res.status(200).json({
      data: deletedRecipe,
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getUserRecipesByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const { userId } = req as AuthenticatedRequest;

    if (!categoryId) {
      throw new Error("Category id is required");
    }

    const recipes = await getUserRecipesByCategoryService(+categoryId, userId);
    res.status(200).json({
      data: recipes,
      success: true,
      message: "Recipes by category fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getRecipesByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const recipes = await getRecipesByCategoryService(+categoryId);
    res.status(200).json({
      data: recipes,
      success: true,
      message: "Recipes by category fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};
