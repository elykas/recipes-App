import { NextFunction, Request, Response } from "express";
import {
  createRecipeService,
  deleteRecipeService,
  getAllRecipesFromUserService,
  getRecipeByIdService,
  getRecipesByCategoryService,
  updateRecipeService,
} from "../services/recipeService";
import { AuthenticatedRequest } from "../types/requests";
import { FullRecipe } from "../types/responses";
import IRecipe from "../models/recipeModel";
import { RecipeResponseDTO } from "../dto/recipe.dto";

export const getAllRecipesFromUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorId: number = req.userId;
    const recipes: RecipeResponseDTO[] = await getAllRecipesFromUserService(authorId);
    if (!recipes || recipes.length === 0) {
      res.status(404).json({ message: "No recipes found" });
      return;
    }
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
    const recipe: RecipeResponseDTO | null = await getRecipeByIdService(+recipeId);
    if (!recipe) {
      res.status(404).json({ message: "Recipe not found", success: false });
      return;
    }
    res.status(200).json({ data: recipe, success: true });
  } catch (error) {
    next(error);
  }
};

export const createRecipe = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipe: IRecipe = req.body;
    const userId = req.userId;

    const newRecipe : RecipeResponseDTO= await createRecipeService(recipe, userId);
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
    const recipe = req.body;

    const updatedRecipe = await updateRecipeService(+recipeId, recipe);
    if (!updatedRecipe) {
      res.status(404).json({ message: "Recipe not found", success: false });
      return;
    }
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
    const deletedRecipe = await deleteRecipeService(+recipeId);
    if (!deletedRecipe) {
      res.status(404).json({ message: "Recipe not found", success: false });
      return;
    }
    res.status(200).json({ data: deletedRecipe, success: true });
  } catch (error) {
    next(error);
  }
};

export const getByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category } = req.params;

    if (!category || category.trim().length === 0) {
      res.status(400).json({ message: "Category is required", success: false });
      return;
    }

    const recipes = await getRecipesByCategoryService(category);
    if (!recipes || recipes.length === 0) {
      res.status(404).json({ message: "No recipes found" });
      return;
    }
    res.status(200).json({ data: recipes, success: true });
  } catch (error) {
    next(error);
  }
};
