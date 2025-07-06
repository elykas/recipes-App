import { NextFunction, Request, Response } from "express";
import {
  createRecipeService,
  getAllRecipesService,
  getRecipeByIdService,
  getRecipesByCategoryService,
} from "../services/recipeService";

export const getAllRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorId: number = (req as any).userId;
    const recipes = await getAllRecipesService(authorId);
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
    const recipe = await getRecipeByIdService(recipeId);
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
  req: Request,
  res: Response,

  next: NextFunction
) => {
  try {
    const recipe = req.body;
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "No Id provided", success: false });
    }
    const newRecipe = await createRecipeService(recipe, userId);
    if (!newRecipe) {
      res.status(404).json({ message: "Can't create recipe", success: false });
      return;
    }
    res
      .status(201)
      .json({
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

    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, req.body, {
      new: true,
    });
    if (!updatedRecipe) {
      res.status(404).json({ message: "Recipe not found", success: false });
      return;
    }
    res
      .status(200)
      .json({
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
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
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
