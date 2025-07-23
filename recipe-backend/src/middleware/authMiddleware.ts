import { NextFunction, Request, Response } from "express";
import { getGroupMembersByGroupPublicIdService } from "../services/groupService";
import { getPublicUserIdByRecipeIdService } from "../services/recipeService";
import { getUserByIdService } from "../services/userService";
import { GroupMembersIdByGroupIdResponse } from "../types/responses";
import { verifyAuthToken, VerifyUserToken } from "../utils/authUtils/jwt";
import { checkIfUserIsMemberOfGroup } from "../utils/checkUtils/checkUserUtils";
import { Auth } from "mongodb";

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
    const userPublicId = req.publicId;
    if (!userPublicId) {
      res.status(403).json({
        message: "Forbidden: User not authenticated",
        success: false,
      });
      return;
    }

    await checkIfUserIsMemberOfGroup(groupPublicId, userPublicId);

    next();
  } catch (error: any) {
    res.status(error.status || 500).json({
      message:
        error.message || "Internal server error while checking group ownership",
      success: false,
    });
  }
};

export const checkUserIsAdminOfGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupPublicId = req.params.groupId;
    const groupMembers: GroupMembersIdByGroupIdResponse =
      await getGroupMembersByGroupPublicIdService(groupPublicId);

    if (!groupMembers) {
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

    const user = groupMembers.members.find(
      (member: { admin: boolean; user: { publicId: string } }) =>
        member.user.publicId === userPublicId
    );

    if (!user || !user.admin) {
      res.status(403).json({
        message: "Forbidden: User is not an admin of this group",
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
};

export const checkIsGroupMemberAndOwnerRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupPublicId = req.params.groupId;
    const userPublicId = req.publicId;
    const recipePublicId = req.params.recipeId;

    if (!userPublicId || !recipePublicId || !groupPublicId) {
      res.status(403).json({
        message: "Forbidden: User not authenticated",
        success: false,
      });
      return;
    }

    await checkIfUserIsMemberOfGroup(groupPublicId, userPublicId);

    const authorRecipePublicId: string =
      await getPublicUserIdByRecipeIdService(recipePublicId);

    if (authorRecipePublicId !== userPublicId) {
      res.status(403).json({
        message: "Forbidden: User doesn't own this recipe",
        success: false,
      });
      return;
    }

    next();
  } catch (error: any) {
    res.status(error.status || 500).json({
      message:
        error.message || "Internal server error while checking group ownership",
      success: false,
    });
  }
};

export const checkIsGroupMemberAndOwnerRecipeOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupPublicId = req.params.groupId;
    const userPublicId = req.publicId;
    const recipePublicId = req.params.recipeId;

    if (!userPublicId || !recipePublicId || !groupPublicId) {
      res.status(403).json({
        message: "Forbidden: User not authenticated",
        success: false,
      });
      return;
    }

    const groupMembers: GroupMembersIdByGroupIdResponse =
      await getGroupMembersByGroupPublicIdService(groupPublicId);

    if (!groupMembers) {
      res.status(404).json({ message: "Group not found", success: false });
      return;
    }

    const user = groupMembers.members.find(
      (member: { admin: boolean; user: { publicId: string } }) =>
        member.user.publicId === userPublicId
    );

    const authorRecipePublicId: string =
      await getPublicUserIdByRecipeIdService(recipePublicId);

    if (authorRecipePublicId !== userPublicId && !user?.admin) {
      res.status(403).json({
        message: "Forbidden: User doesn't own this recipe",
        success: false,
      });
      return;
    }

    next();
  } catch (error: any) {
    res.status(error.status || 500).json({
      message:
        error.message || "Internal server error while checking group ownership",
      success: false,
    });
  }
};
