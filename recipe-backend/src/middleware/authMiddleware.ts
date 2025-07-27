import { NextFunction, Request, Response } from "express";
import {
  getGroupPublicIdByRecipeIdService,
  getMemberOfGroupService,
} from "../services/groupService";
import { getUserPublicIdByPostIdService } from "../services/postService";
import { getUserPublicIdByRecipeIdService } from "../services/recipeService";
import { getUserByIdService } from "../services/userService";
import { MemberOfGroupResponse } from "../types/response/groupResponse";
import { AuthorOfPostResponse } from "../types/response/postResponse";
import { verifyAuthToken, VerifyUserToken } from "../utils/authUtils/jwt";
import {
  checkIfUserIsAdminOfGroup,
  checkIfUserIsMemberOfGroup,
} from "../utils/checkUtils/checkGroupUtils";

declare module "express" {
  interface Request {
    publicId?: string;
  }
}

export const authenticateTokenMiddleware = (
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

export const authorizeAdminMiddleware = async (
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

export const authorizeUserAndExistMiddleware = async (
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

export const checkRecipeOwnerShipMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipePublicId = req.params.recipeId;
    const userPublicId = req.publicId;
    if (!userPublicId || !recipePublicId) {
      res
        .status(403)
        .json({ message: "Forbidden: User not authenticated", success: false });
      return;
    }

    const authorRecipePublicId: string =
      await getUserPublicIdByRecipeIdService(recipePublicId);
    if (!authorRecipePublicId) {
      res.status(404).json({ message: "Recipe not found", success: false });
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

export const checkIsUserGroupMemberMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupPublicId = req.params.groupId;
    const userPublicId = req.publicId;
    if (!userPublicId || !groupPublicId) {
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

export const checkUserIsAdminOfGroupMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupPublicId = req.params.groupId;
    const userPublicId = req.publicId;
    if (!userPublicId || !groupPublicId) {
      res
        .status(403)
        .json({ message: "Forbidden: User not authenticated", success: false });
      return;
    }

    const groupMember: boolean = await checkIfUserIsAdminOfGroup(
      userPublicId,
      groupPublicId
    );

    if (!groupMember) {
      res.status(404).json({
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

export const checkIsGroupMemberAndOwnerRecipeMiddleware = async (
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

    const groupMember: MemberOfGroupResponse = await checkIfUserIsMemberOfGroup(
      groupPublicId,
      userPublicId
    );

    const authorRecipePublicId: string =
      await getUserPublicIdByRecipeIdService(recipePublicId);

    if (authorRecipePublicId !== groupMember.user.publicId) {
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

export const checkIsGroupMemberAndOwnerOrAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupPublicId = req.params.groupId;
    const userPublicId = req.publicId;
    const { userId, recipeId } = req.params;

    if (!userPublicId || !groupPublicId) {
      res.status(403).json({
        message: "Forbidden: User not authenticated",
        success: false,
      });
      return;
    }

    const groupMember: MemberOfGroupResponse = await getMemberOfGroupService(
      userPublicId,
      groupPublicId
    );

    if (!groupMember) {
      res.status(403).json({
        message: "Forbidden: User is not a member of the group",
        success: false,
      });
      return;
    }

    if (recipeId) {
      const authorRecipePublicId =
        await getUserPublicIdByRecipeIdService(recipeId);

      if (
        authorRecipePublicId !== groupMember.user.publicId &&
        !groupMember.admin
      ) {
        return res.status(403).json({
          message: "Forbidden: User doesn't own this recipe or is not admin",
          success: false,
        });
      }
    }

    if (userId) {
      if (!groupMember.admin && groupMember.user.publicId !== userId) {
        return res.status(403).json({
          message: "Forbidden: Only admins can modify other members",
          success: false,
        });
      }
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

export const checkIsRecipeAndUserGroupMemberMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipePublicId = req.params.recipeId;
    const userPublicId = req.publicId;
    const groupPublicId = req.params.groupId;

    if (!userPublicId || !recipePublicId || !groupPublicId) {
      res.status(403).json({
        message: "Forbidden: User not authenticated",
        success: false,
      });
      return;
    }
    const groupRecipePublicId = await getGroupPublicIdByRecipeIdService(
      recipePublicId,
      groupPublicId
    );

    await checkIfUserIsMemberOfGroup(groupRecipePublicId, userPublicId);
    next();
  } catch (error) {
    res.status(403).json({
      message: "Forbidden: User is not a member of the group",
      success: false,
    });
    return;
  }
};

export const checkIsMemberGroupMemberMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupPublicId = req.params.groupId;
    const memberPublicId = req.params.memberId;

    if (!memberPublicId || !groupPublicId) {
      res.status(403).json({
        message: "Forbidden: User not authenticated",
        success: false,
      });
      return;
    }

    await checkIfUserIsMemberOfGroup(groupPublicId, memberPublicId);
    next();
  } catch (error) {
    res.status(403).json({
      message: "Forbidden: User is not a member of the group",
      success: false,
    });
    return;
  }
};

export const checkIfUserOwnerOfPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const postPublicId = req.params.postId;
    const userPublicId = req.publicId;
  
    if (!userPublicId || !postPublicId) {
      res.status(403).json({
        message: "Forbidden: User not authenticated",
        success: false,
      });
      return;
    }
  
    const authorPostPublicId: AuthorOfPostResponse =
      await getUserPublicIdByPostIdService(postPublicId);
  
    if (authorPostPublicId.author.publicId !== userPublicId) {
      res.status(403).json({
        message: "Forbidden: User doesn't own this post",
        success: false,
      });
      return;
    }
  
    next();
  } catch (error) {
    res.status(403).json({
      message: "Forbidden: User doesn't own this post",
      success: false,
    })
  }
};
