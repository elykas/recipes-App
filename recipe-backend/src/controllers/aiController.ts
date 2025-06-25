import { Request, Response, NextFunction } from "express";
import { getRecipeAIService } from "../services/ai/aiService";

export const generateRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ingredients, category, freeText,previousRecipes } = req.body;
    const recipe = await getRecipeAIService(ingredients, category, freeText,previousRecipes);
    res.status(200).json({ success: true, data: recipe });
  } catch (error) {
    next(error);
  }
};
