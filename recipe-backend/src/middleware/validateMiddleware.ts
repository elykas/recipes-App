import {UserSchema} from "../schema/validateUserSchema";
import {recipeIdParamsSchema, RecipeSchema, recipesIdBodySchema, searchQuerySchema} from "../schema/validateRecipeScema";
import {Request, Response, NextFunction} from "express";

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const result = UserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.message,
    });
  }
  next();
};


export const validateRecipe = (req: Request, res: Response, next: NextFunction) => {
  const result = RecipeSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.message,
    });
  }
  next();
};

export const validateSearchQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const parseResult = searchQuerySchema.safeParse(req.query);
  if (!parseResult.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid query",
      errors: parseResult.error.message,
    });
  }
  next();
};

export const validateRecipeIdParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = recipeIdParamsSchema.safeParse(req.params);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid recipe ID parameter",
      errors: result.error.message,
    });
  }
  next();
};

export const validateRecipeIdBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = recipesIdBodySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid recipe ID parameter",
      errors: result.error.message,
    });
  }
  next();
};