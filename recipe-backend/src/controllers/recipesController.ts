import { NextFunction, Request, Response } from "express";
import {
  createRecipeService,
  deleteRecipeService,
  getAllRecipesFromUserService,
  getAllRecipesService,
  getRecipeByIdService,
  getRecipesByCategoryService,
  getUserRecipesByCategoryService,
  updateRecipeService,
} from "../services/recipeService";
import { AuthenticatedRequest } from "../types/requests";
import IRecipe from "../models/recipeModel";
import { RecipeResponseDTO } from "../dto/recipe.dto";

export const getAllRecipesFromUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const recipes: RecipeResponseDTO[] =
      await getAllRecipesFromUserService(userId);
    res.status(200).json({ data: recipes, success: true });
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
    res.status(200).json({ data: recipes, success: true });
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
    res.status(200).json({ data: recipe, success: true });
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

    const newRecipe: RecipeResponseDTO = await createRecipeService(
      recipe,
      userId
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
    const recipe: IRecipe = req.body;

    const updatedRecipe: RecipeResponseDTO = await updateRecipeService(recipe);
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
    res.status(200).json({ data: recipes, success: true });
  } catch (error) {
    next(error);
  }
};
