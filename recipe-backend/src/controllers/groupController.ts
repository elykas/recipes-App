import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../types/requests";
import {
    addRecipeToGroupService,
  createGroupService,
  deleteGroupService,
  editGroupDetailsService,
  getGroupRecipesPreviewService,
  getUserGroupsService,
} from "../services/groupService";
import {
  CreateGroupDto,
  DeleteGroupDto,
  GroupRecipesPreviewDto,
  NewGroupDto,
  UserGroupsDto,
} from "../dto/groupDto";

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
    const groups: GroupRecipesPreviewDto =
      await getGroupRecipesPreviewService(publicGroupId);
    res.status(200).json({
      data: groups,
      success: true,
      message: "Groups fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const createGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { publicId: publicUserId } = req as AuthenticatedRequest;
    const groupData: CreateGroupDto = req.body.groupData;
    const newGroup: NewGroupDto = await createGroupService(
      groupData,
      publicUserId
    );
    res.status(200).json({
      data: newGroup,
      success: true,
      message: "Groups fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const editGroupDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { groupId: publicGroupId } = req.params;
    const groupData: CreateGroupDto = req.body.groupData;
    const { publicId: publicUserId } = req as AuthenticatedRequest;
    const updatedGroupDetails: NewGroupDto = await editGroupDetailsService(
      groupData,
      publicGroupId,
      publicUserId
    );
    res.status(200).json({
      data: updatedGroupDetails,
      success: true,
      message: "Groups updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { groupId: publicGroupId } = req.params;
    const { publicId: publicUserId } = req as AuthenticatedRequest;
    const deletedGroup: DeleteGroupDto = await deleteGroupService(
      publicGroupId,
      publicUserId
    );
    res.status(200).json({
      data: deletedGroup,
      success: true,
      message: "Groups deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const addRecipeToGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { groupId: publicGroupId, recipeId: publicRecipeId } = req.params;
    const { publicId: publicUserId } = req as AuthenticatedRequest;
    const recipeAdded = await addRecipeToGroupService(
      publicRecipeId,
      publicGroupId,
      publicUserId
    )
    res.status(200).json({
      data: recipeAdded,
      success: true,
      message: "Groups deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};