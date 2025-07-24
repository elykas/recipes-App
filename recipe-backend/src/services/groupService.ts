import { get } from "http";
import {
  pgUpdateImageOfGroup,
  pgAddRecipeToGroup,
  pgCreateGroup,
  pgDeleteGroup,
  pgEditGroupDetails,
  pgGetGroupRecipesPreview,
  pgGetMembersPublicIdByPublicGroupId,
  pgGetUserGroups,
  pgRemoveRecipeFromGroup,
  pgGetImageOfGroupByPublicId,
  pgAddGroupMember,
  pgRemoveGroupMember,
  pgGetGroupIdByPublicId,
  pgGetGroupPublicIdByRecipeId,
  pgGetGroupRecipeById,
  pgUpdateAdminStatus,
} from "../dal/groupDal";
import {
  AddGroupMemberDto,
  AddRecipeToGroupDto,
  CreateGroupDto,
  DeleteGroupDto,
  GroupRecipesPreviewDto,
  NewGroupDto,
  FullRecipeGroupDto,
  RemoveRecipeFromGroupDto,
  UpdatedGroupDto,
  UpdatedImageGroupDto,
  UserGroupsDto,
  GroupMemberDto,
  GroupOfMemberDto,
} from "../dto/groupDto";
import {
  GroupIdResponse,
  GroupMembersIdByGroupIdResponse,
  GroupRecipesPreviewResponse,
  UpdatedGroupResponse,
  AddGroupMemberResponse,
  UserGroupsResponse,
  UpdateGroupRecipeResponse,
} from "../types/response/groupResponse";
import {
  checkIfUserIsAdminOfGroup,
  findUserInGroupMembers,
} from "../utils/checkUtils/checkGroupUtils";
import ErrorResponse from "../utils/errors/errors";
import {
  groupRecipesPreviewMapper,
  recipeGroupMapper,
  userGroupsMapper,
} from "../utils/mappers/groupMapper";
import { mapFullRecipeToDTO } from "../utils/mappers/recipeMapper";
import {
  getRecipeIdByPublicIdService,
  getUserPublicIdByRecipeIdService,
} from "./recipeService";
import { deleteImageFromStorage, uploadSingleImage } from "./storageService";

export const getUserGroupsService = async (
  publicUserId: string
): Promise<UserGroupsDto[]> => {
  const userGroups: UserGroupsResponse[] = await pgGetUserGroups(publicUserId);

  const userGroupsDto: UserGroupsDto[] = userGroups.map(userGroupsMapper);

  return userGroupsDto;
};

export const getGroupIdByPublicIdService = async (publicId: string) => {
  const groupId: number | null = await pgGetGroupIdByPublicId(publicId);
  if (!groupId) throw ErrorResponse("Group not found", 404);
  return groupId;
};

export const getGroupRecipesPreviewService = async (
  publicGroupId: string
): Promise<GroupRecipesPreviewDto> => {
  const GroupRecipes: GroupRecipesPreviewResponse | null =
    await pgGetGroupRecipesPreview(publicGroupId);

  if (!GroupRecipes) throw ErrorResponse("Group not found", 404);

  const GroupRecipesDto: GroupRecipesPreviewDto =
    groupRecipesPreviewMapper(GroupRecipes);

  return GroupRecipesDto;
};

export const getGroupMembersByGroupPublicIdService = async (
  groupPublicId: string
): Promise<GroupMembersIdByGroupIdResponse> => {
  const groupMembersId: GroupMembersIdByGroupIdResponse | null =
    await pgGetMembersPublicIdByPublicGroupId(groupPublicId);

  if (!groupMembersId || groupMembersId.members.length === 0)
    throw ErrorResponse("Group not found", 404);

  return groupMembersId;
};

export const createGroupService = async (
  groupData: CreateGroupDto,
  publicUserId: string
): Promise<NewGroupDto> => {
  const newGroup: GroupIdResponse = await pgCreateGroup(
    groupData,
    publicUserId
  );
  const newGroupDto: NewGroupDto = { publicId: newGroup.publicId };
  return newGroupDto;
};

export const editGroupDetailsService = async (
  groupData: CreateGroupDto,
  groupPublicId: string,
  userPublicId: string
) => {
  const isAdmin: boolean = await checkIfUserIsAdminOfGroup(
    userPublicId,
    groupPublicId
  );

  if (!isAdmin) throw ErrorResponse("Unauthorized edit group details", 401);

  const updatedGroup: UpdatedGroupResponse = await pgEditGroupDetails(
    groupData,
    groupPublicId
  );

  const updatedGroupDto: UpdatedGroupDto = {
    publicId: updatedGroup.publicId,
    name: updatedGroup.name,
    description: updatedGroup.description,
  };
  return updatedGroupDto;
};

export const deleteGroupService = async (
  groupPublicId: string,
  publicUserId: string
): Promise<DeleteGroupDto> => {
  const isAdmin: boolean = await checkIfUserIsAdminOfGroup(
    publicUserId,
    groupPublicId
  );

  if (!isAdmin) throw ErrorResponse("Unauthorized edit group details", 401);

  const deletedGroup: GroupIdResponse = await pgDeleteGroup(groupPublicId);

  const deletedGroupDto: DeleteGroupDto = { publicId: deletedGroup.publicId };

  return deletedGroupDto;
};

export const addRecipeToGroupService = async (
  recipePublicId: string,
  groupPublicId: string,
  userPublicId: string
): Promise<AddRecipeToGroupDto> => {
  const userIdByRecipeId =
    await getUserPublicIdByRecipeIdService(recipePublicId);

  if (userIdByRecipeId !== userPublicId) {
    throw ErrorResponse("Unauthorized add recipe to group", 401);
  }

  const recipeAdded: UpdateGroupRecipeResponse = await pgAddRecipeToGroup(
    recipePublicId,
    groupPublicId,
    userPublicId
  );
  const recipeAddedDto: AddRecipeToGroupDto = {
    publicId: recipeAdded.group.publicId,
  };

  return recipeAddedDto;
};

export const removeRecipeFromGroupService = async (
  recipePublicId: string,
  groupPublicId: string,
  userPublicId: string
) => {
  const userIdByRecipeId =
    await getUserPublicIdByRecipeIdService(recipePublicId);

  const isAdmin: boolean = await checkIfUserIsAdminOfGroup(
    userPublicId,
    groupPublicId
  );

  if (userIdByRecipeId !== userPublicId && !isAdmin) {
    throw ErrorResponse("Unauthorized remove recipe from group", 401);
  }

  const recipeRemoved: UpdateGroupRecipeResponse =
    await pgRemoveRecipeFromGroup(recipePublicId, groupPublicId);

  const recipeRemovedDto: RemoveRecipeFromGroupDto = {
    publicId: recipeRemoved.group.publicId,
  };

  return recipeRemovedDto;
};

export const updateImageToGroupService = async (
  groupPublicId: string,
  userPublicId: string,
  image: Express.Multer.File | undefined
) => {
  const isAdmin: boolean = await checkIfUserIsAdminOfGroup(
    userPublicId,
    groupPublicId
  );

  if (!isAdmin) throw ErrorResponse("Unauthorized edit group details", 401);

  let imageUrl: string | null = null;
  const oldImagePath: string = await pgGetImageOfGroupByPublicId(groupPublicId);

  if (image) {
    const imagePath: string = await uploadSingleImage(
      image.buffer,
      userPublicId,
      image.mimetype,
      "group"
    );
    imageUrl = imagePath;
  }

  const imageAdded: GroupIdResponse = await pgUpdateImageOfGroup(
    groupPublicId,
    imageUrl
  );

  if (oldImagePath) {
    await deleteImageFromStorage(oldImagePath);
  }

  const imageAddedDto: UpdatedImageGroupDto = {
    publicId: imageAdded.publicId,
  };

  return imageAddedDto;
};

export const addGroupMemberService = async (
  groupPublicId: string,
  userPublicId: string,
  memberPublicId: string
) => {
  const admin: boolean = await checkIfUserIsAdminOfGroup(
    userPublicId,
    groupPublicId
  );

  if (!admin) throw ErrorResponse("Unauthorized add group member", 401);

  const memberAdded: AddGroupMemberResponse = await pgAddGroupMember(
    groupPublicId,
    memberPublicId
  );
  const groupOfMemberDto: AddGroupMemberDto = {
    publicId: memberAdded.group.publicId,
  };
  return groupOfMemberDto;
};

export const removeGroupMemberService = async (
  groupPublicId: string,
  userPublicId: string,
  memberPublicId: string
): Promise<number> => {
  const isAdmin: boolean = await checkIfUserIsAdminOfGroup(
    userPublicId,
    groupPublicId
  );

  if (!isAdmin && memberPublicId !== userPublicId) {
    throw ErrorResponse("Unauthorized remove recipe from group", 401);
  }
  const memberRemoved: number = await pgRemoveGroupMember(
    groupPublicId,
    memberPublicId
  );
  return memberRemoved;
};

export const getGroupPublicIdByRecipeIdService = async (
  recipePublicId: string,
  groupPublicId: string
) => {
  const groupId = await getGroupIdByPublicIdService(groupPublicId);
  const recipeId = await getRecipeIdByPublicIdService(recipePublicId);
  const groupPublicIdFromRecipe = await pgGetGroupPublicIdByRecipeId(
    recipeId,
    groupId
  );
  if (!groupPublicIdFromRecipe) {
    throw ErrorResponse("Recipe not belongs to group", 404);
  }
  return groupPublicIdFromRecipe;
};

export const getGroupRecipeByIdService = async (
  recipePublicId: string,
  groupPublicId: string
) => {
  const recipeGroup = await pgGetGroupRecipeById(recipePublicId, groupPublicId);
  const recipeDto: FullRecipeGroupDto = recipeGroupMapper(recipeGroup);
  return recipeGroup;
};

export const updateAdminStatusService = async (
  groupPublicId: string,
  userPublicId: string,
  memberPublicId: string
) => {
  const isAdmin: boolean = await checkIfUserIsAdminOfGroup(
    userPublicId,
    groupPublicId
  );
  if (!isAdmin) throw ErrorResponse("Unauthorized update admin status", 401);

  const groupMembersPublicId: GroupMembersIdByGroupIdResponse =
    await getGroupMembersByGroupPublicIdService(groupPublicId);

  const member = findUserInGroupMembers(groupMembersPublicId, memberPublicId);
  if (!member) throw ErrorResponse("User not found in group", 404);

  const memberAdminStatus: boolean = member.admin;

  const memberId = member.user.id;
  const groupId = await getGroupIdByPublicIdService(groupPublicId);

  const adminStatus: GroupIdResponse = await pgUpdateAdminStatus(
    groupId,
    memberId,
    memberAdminStatus
  );
  const groupOfMemberDto: GroupOfMemberDto = { publicId: adminStatus.publicId };
  return groupOfMemberDto;
};
