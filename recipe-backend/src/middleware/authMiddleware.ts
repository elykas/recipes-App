import { NextFunction, Request, Response } from "express";
import {
  getPublicUserIdByRecipeIdService,
  getRecipeByIdService,
} from "../services/recipeService";
import {
  getUserByIdService,
  getUserIdByPublicIdService,
} from "../services/userService";
import {
  verifyAuthToken as verifyAuthToken,
  VerifyUserToken,
} from "../utils/authUtils/jwt";
import { get } from "http";
import { getPublicUserIdByGroupPublicIdService } from "../services/groupService";
import { GroupMembersIdByGroupIdResponse } from "../types/responses";

declare module "express" {
  interface Request {
    publicId?: string;
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decoded = VerifyUserToken(req);
    const userId = decoded.publicId;
    if (!userId) {
      res.status(400).json({ message: "Missing user ID", success: false });
      return;
    }
    req.publicId = userId;
    next();
  } catch (error) {
    res.status(403).json({ message: (error as Error).message, success: false });
    return;
  }
};

export const verifyAuthTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.body.token;
    if (typeof token !== "string" || !token) {
      res
        .status(401)
        .json({ message: "Token is missing or invalid", success: false });
      return;
    }

    const decoded = verifyAuthToken(token);
    if (!decoded) {
      res
        .status(403)
        .json({ message: "Invalid or expired token", success: false });
      return;
    }

    req.publicId = decoded.sub;

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
    const decoded = VerifyUserToken(req);

    if (!decoded?.publicId || !decoded.isAdmin) {
      res
        .status(403)
        .json({ message: "Forbidden: Admins only", success: false });
      return;
    }

    const user = await getUserByIdService(decoded.publicId);
    if (!user) {
      res.status(404).json({ message: "User not found", success: false });
      return;
    }

    req.publicId = user.publicId;
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
    const decoded = VerifyUserToken(req);

    if (!decoded?.publicId) {
      res
        .status(403)
        .json({ message: "Forbidden: Users only", success: false });
      return;
    }

    const user = await getUserByIdService(decoded.publicId);
    if (!user) {
      res.status(404).json({ message: "User not found", success: false });
      return;
    }

    req.publicId = user.publicId;
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
    const recipePublicId = req.params.recipeId;
    const authorRecipePublicId: string =
      await getPublicUserIdByRecipeIdService(recipePublicId);
    if (!authorRecipePublicId) {
      res.status(404).json({ message: "Recipe not found", success: false });
      return;
    }
    const userPublicId = req.publicId;
    if (!userPublicId) {
      res
        .status(403)
        .json({ message: "Forbidden: User not authenticated", success: false });
      return;
    }

    if (authorRecipePublicId !== userPublicId) {
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


export const checkGroupOwnerShip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupPublicId = req.params.groupId;
    const authorRecipePublicId: GroupMembersIdByGroupIdResponse =
      await getPublicUserIdByGroupPublicIdService(groupPublicId);

    if (!authorRecipePublicId) {
      res.status(404).json({ message: "Group not found", success: false });
      return;
    }

    const userPublicId = req.publicId;
    if (!userPublicId) {
      res
        .status(403)
        .json({ message: "Forbidden: User not authenticated", success: false });
      return;
    }
    
    const isMember = authorRecipePublicId.members.some(
      (member: any) => member.publicId === userPublicId
    );
    
    if (!isMember) {
      res.status(403).json({
        message: "Forbidden: User doesn't own this group",
        success: false,
      });
      return;    
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while checking group ownership",
      success: false,
    });
    return; 
    }
  }