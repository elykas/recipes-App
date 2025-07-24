import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../types/requests";
import {
  addGroupMemberService,
  addRecipeToGroupService,
  createGroupService,
  deleteGroupService,
  editGroupDetailsService,
  getGroupRecipeByIdService,
  getGroupRecipesPreviewService,
  getUserGroupsService,
  removeGroupMemberService,
  removeRecipeFromGroupService,
  updateAdminStatusService,
  updateImageToGroupService,
} from "../services/groupService";
import {
  AddGroupMemberDto,
  CreateGroupDto,
  DeleteGroupDto,
  GroupOfMemberDto,
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
    );
    res.status(200).json({
      data: recipeAdded,
      success: true,
      message: "Groups deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const removeRecipeFromGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { groupId: publicGroupId, recipeId: publicRecipeId } = req.params;
    const { publicId: publicUserId } = req as AuthenticatedRequest;
    const recipeRemoved = await removeRecipeFromGroupService(
      publicRecipeId,
      publicGroupId,
      publicUserId
    );
    res.status(200).json({
      data: recipeRemoved,
      success: true,
      message: "Recipes removed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateImageOfGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { groupId: publicGroupId } = req.params;
    const { publicId: publicUserId } = req as AuthenticatedRequest;
    const image = req.file;
    const recipeAdded = await updateImageToGroupService(
      publicGroupId,
      publicUserId,
      image
    );
    res.status(200).json({
      data: recipeAdded,
      success: true,
      message: "Groups deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const addGroupMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { groupId: groupPublicId } = req.params;
    const { publicId: userPublicId } = req as AuthenticatedRequest;
    const memberPublicId = req.params.userId;

    const groupOfMember: AddGroupMemberDto = await addGroupMemberService(
      groupPublicId,
      userPublicId,
      memberPublicId
    );
    res.status(200).json({
      data: groupOfMember,
      success: true,
      message: "Groups deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const removeGroupMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { groupId: groupPublicId } = req.params;
    const { publicId: userPublicId } = req as AuthenticatedRequest;
    const memberPublicId = req.params.userId;

    const groupOfMember: number = await removeGroupMemberService(
      groupPublicId,
      userPublicId,
      memberPublicId
    );
    res.status(200).json({
      data: groupOfMember,
      success: true,
      message: "Groups deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getGroupRecipeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipeId: recipePublicId } = req.params;
    const { groupId: groupPublicId } = req.params;
    const recipe = await getGroupRecipeByIdService(
      recipePublicId,
      groupPublicId
    );
    res.status(200).json({
      data: recipe,
      success: true,
      message: "Recipe fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateAdminStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { groupId: groupPublicId } = req.params;
    const { publicId: userPublicId } = req as AuthenticatedRequest;
    const memberPublicId = req.params.userId;

    const groupOfMember: GroupOfMemberDto = await updateAdminStatusService(
      groupPublicId,
      userPublicId,
      memberPublicId
    );
    res.status(200).json({
      data: groupOfMember,
      success: true,
      message: "Groups deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
