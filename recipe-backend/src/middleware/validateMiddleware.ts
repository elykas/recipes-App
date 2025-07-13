import {UserSchema} from "../schema/validateUserSchema";
import {RecipeSchema} from "../schema/validateRecipeScema";
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