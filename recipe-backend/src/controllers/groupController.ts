import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../types/requests";
import { createGroupService, getGroupRecipesPreviewService, getUserGroupsService } from "../services/groupService";
import { CreateGroupDto, GroupRecipesPreviewDto, NewGroupDto, UserGroupsDto } from "../dto/groupDto";
import { create } from "domain";


export const getUserGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { publicId: publicUserId } = req as AuthenticatedRequest;
    const groups: UserGroupsDto[] = await getUserGroupsService(publicUserId);
    res.status(200).json({
      success: true,
      data: groups,
      message: "Groups fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getGroupRecipesPreview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { groupId: publicGroupId } = req.params;
      const groups: GroupRecipesPreviewDto = await getGroupRecipesPreviewService(publicGroupId);
      res.status(200).json({
        data: groups,
        success: true,
        message: "Groups fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  export const createGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { publicId: publicUserId } = req as AuthenticatedRequest;
      const groupData : CreateGroupDto = req.body.groupData;
      const newGroup: NewGroupDto = await createGroupService(groupData, publicUserId);
      res.status(200).json({
        data: newGroup,
        success: true,
        message: "Groups fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }
