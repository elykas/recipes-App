import { Request, Response, NextFunction } from "express";
import Recipe from "../models/recipeModel";
import {
  createRecipeService,
  getAllRecipesService,
  getRecipeByIdService,
  getRecipesByCategoryService,
} from "../services/recipeService";
import { get } from "node:http";

export const getAllRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipes = await getAllRecipesService();
    if (!recipes || recipes.length === 0) {
      res.status(404).json({ message: "No recipes found" });
      return;
    }
    res.status(200).json({ data: recipes, succsess: true });
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
    const recipe = await getRecipeByIdService(req.params.recipeId);
    if (!recipe) {
      res.status(404).json({ message: "Recipe not found", succsess: false });
      return;
    }
    res.status(200).json({ data: recipe, succsess: true });
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
    const recipe = await createRecipeService(req.body);
    if (!recipe) {
      res.status(404).json({ message: "Can't create recipe", succsess: false });
      return;
    }
    res.status(201).json({ data: recipe, succsess: true });
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
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      req.body,
      { new: true }
    );
    if (!recipe) {
      res.status(404).json({ message: "Recipe not found", succsess: false });
      return;
    }
    res.status(200).json({ data: recipe, succsess: true });
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
    const recipe = await Recipe.findByIdAndDelete(req.params.recipeId);
    if (!recipe) {
      res.status(404).json({ message: "Recipe not found", succsess: false });
      return;
    }
    res.status(200).json({ data: recipe, succsess: true });
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
    const category = req.params.category;

    if (!category || category.trim().length === 0) {
      res.status(400).json({ message: "Category is required", success: false });
      return;
    }

    const recipes = await getRecipesByCategoryService(category);
    if (!recipes || recipes.length === 0) {
      res.status(404).json({ message: "No recipes found" });
      return;
    }
    res.status(200).json({ data: recipes, succsess: true });
  } catch (error) {
    next(error);
  }
};
