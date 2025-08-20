import { NextFunction, Request, Response } from "express";
import { groupBodySchema } from "../schema/validateGroupSchema";
import { LikeBodySchema, PostBodySchema } from "../schema/validatePostSchema";
import {
  IdParamsSchema,
  RecipeSchema,
  IdsBodySchema,
  searchQuerySchema,
} from "../schema/validateRecipeScema";
import { UserSchema } from "../schema/validateUserSchema";
import { CreatePoliciesSchema, GetPolicyQuerySchema } from "../schema/validatePolicySchema";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = UserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.message,
    });
  }
  next();
};

export const validateRecipe = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const validateIdParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = IdParamsSchema.safeParse(req.params);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid recipe ID parameter",
      errors: result.error.message,
    });
  }
  next();
};

export const validateRecipeIdsBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = IdsBodySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid recipe ID parameter",
      errors: result.error.message,
    });
  }
  next();
};

export const validateGroupBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = groupBodySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid group",
      errors: result.error.message,
    });
  }
  next();
};

export const validatePostBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = PostBodySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid post",
      errors: result.error.message,
    });
  }
  next();
};

export const validateLikeBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = LikeBodySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid like",
      errors: result.error.message,
    });
  }
  next();
};

export const validatePostIdsBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = IdsBodySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid recipe ID parameter",
      errors: result.error.message,
    });
  }
  next();
};

export const validatePolicyCreation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const policies = req.body.policies;
  if (!Array.isArray(policies) || policies.length < 2) {
    return res.status(400).json({
      success: false,
      message: "Invalid policies data",
    });
  }

  const result = CreatePoliciesSchema.safeParse(policies);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.error.message,
    });
  }
  next();
};

export const validateGetPolicyQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = GetPolicyQuerySchema.safeParse(req.query);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid query",
      errors: result.error.message,
    });
  }
  next();
};