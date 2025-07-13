import { NextFunction, Request, Response } from "express";
import { getRecipeByIdService } from "../services/recipeService";
import { getUserByIdService } from "../services/userService";
import { extractUserFromToken } from "../utils/authUtils/extractUserFromToken";
import { verifyTempToken } from "../utils/authUtils/jwt";
import { getCategoryByIdService } from "../services/categoriesService";

declare module "express" {
  interface Request {
    userId?: number;
    email?: string;
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decoded = extractUserFromToken(req);
    if (!decoded) {
      res.status(403).json({ message: "Invalid token", success: false });
      return;
    }
    const userId = Number(decoded.id);
    if (!userId) {
      res.status(400).json({ message: "Invalid user ID", success: false });
      return;
    }
    req.userId = userId;

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token", success: false });
    return;
  }
};
export const verifyTempTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.tempToken || req.body.token;
    if (typeof token !== "string" || !token) {
      res
        .status(401)
        .json({ message: "Token is missing or invalid", success: false });
      return;
    }

    const decoded = verifyTempToken(token);
    if (!decoded) {
      res
        .status(403)
        .json({ message: "Invalid or expired token", success: false });
      return;
    }

    req.email = decoded.email;

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token", success: false });
    return;
  }
};

export const authorizeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decoded = extractUserFromToken(req);

    if (!decoded?.id || !decoded.isAdmin) {
      res
        .status(403)
        .json({ message: "Forbidden: Admins only", success: false });
      return;
    }

    const user = await getUserByIdService(Number(decoded.id));
    if (!user) {
      res.status(404).json({ message: "User not found", success: false });
      return;
    }

    req.userId = Number(user.id);
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token", success: false });
    return;
  }
};

export const authorizeUserAndExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decoded = extractUserFromToken(req);

    if (!decoded?.id) {
      res
        .status(403)
        .json({ message: "Forbidden: Users only", success: false });
      return;
    }

    const user = await getUserByIdService(Number(decoded.id));
    if (!user) {
      res.status(404).json({ message: "User not found", success: false });
      return;
    }

    req.userId = Number(user.id);
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token", success: false });
    return;
  }
};

export const checkRecipeOwnerShip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipeId = Number(req.params.recipeId);
    const recipe = await getRecipeByIdService(recipeId);

    if (!recipe) {
      res.status(404).json({ message: "Recipe not found", success: false });
      return;
    }

    if (recipe.authorId !== req.userId) {
      res.status(403).json({
        message: "Forbidden: User doesn't own this recipe",
        success: false,
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while checking recipe ownership",
      success: false,
    });
    return;
  }
};


