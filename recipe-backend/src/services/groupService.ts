import {
  pgAddImageToGroup,
  pgAddRecipeToGroup,
  pgCreateGroup,
  pgDeleteGroup,
  pgEditGroupDetails,
  pgGetGroupRecipesPreview,
  pgGetPublicUserIdByPublicGroupId,
  pgGetUserGroups,
  pgRemoveRecipeFromGroup,
} from "../dal/groupDal";
import {
  AddRecipeToGroupDto,
  CreateGroupDto,
  DeleteGroupDto,
  GroupRecipesPreviewDto,
  NewGroupDto,
  RemoveRecipeFromGroupDto,
  UpdatedGroupDto,
  UserGroupsDto,
} from "../dto/groupDto";
import {
  GroupIdResponse,
  GroupMembersIdByGroupIdResponse,
  GroupRecipesResponse,
  UpdatedGroupResponse,
  UserGroupsResponse,
} from "../types/responses";
import { checkIfUserIsAdminOfGroup } from "../utils/checkUtils/checkUserUtils";
import ErrorResponse from "../utils/errors/errors";
import {
  groupRecipesPreviewMapper,
  userGroupsMapper,
} from "../utils/mappers/groupMapper";
import { getPublicUserIdByRecipeIdService } from "./recipeService";

export const getUserGroupsService = async (
  publicUserId: string
): Promise<UserGroupsDto[]> => {
  const userGroups: UserGroupsResponse[] = await pgGetUserGroups(publicUserId);

  const userGroupsDto: UserGroupsDto[] = userGroups.map(userGroupsMapper);

  return userGroupsDto;
};

export const getGroupRecipesPreviewService = async (
  publicGroupId: string
): Promise<GroupRecipesPreviewDto> => {
  const GroupRecipes: GroupRecipesResponse | null =
    await pgGetGroupRecipesPreview(publicGroupId);

  if (!GroupRecipes) throw ErrorResponse("Group not found", 404);

  const GroupRecipesDto: GroupRecipesPreviewDto =
    groupRecipesPreviewMapper(GroupRecipes);

  return GroupRecipesDto;
};

export const getPublicUserIdByGroupPublicIdService = async (
  publicGroupId: string
): Promise<GroupMembersIdByGroupIdResponse> => {
  const groupMembersId: GroupMembersIdByGroupIdResponse | null =
    await pgGetPublicUserIdByPublicGroupId(publicGroupId);

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
  publicGroupId: string,
  publicUserId: string
) => {
  const isAdmin: boolean = await checkIfUserIsAdminOfGroup(publicUserId);

  if (!isAdmin) throw ErrorResponse("Unauthorized edit group details", 401);

  const updatedGroup: UpdatedGroupResponse = await pgEditGroupDetails(
    groupData,
    publicGroupId
  );

  const updatedGroupDto: UpdatedGroupDto = {
    publicId: updatedGroup.publicId,
    name: updatedGroup.name,
    description: updatedGroup.description,
  };
  return updatedGroupDto;
};

export const deleteGroupService = async (
  publicGroupId: string,
  publicUserId: string
): Promise<DeleteGroupDto> => {
  const isAdmin: boolean = await checkIfUserIsAdminOfGroup(publicUserId);

  if (!isAdmin) throw ErrorResponse("Unauthorized edit group details", 401);

  const deletedGroup: GroupIdResponse = await pgDeleteGroup(publicGroupId);

  const deletedGroupDto: DeleteGroupDto = { publicId: deletedGroup.publicId };

  return deletedGroupDto;
};

export const addRecipeToGroupService = async (
  publicRecipeId: string,
  publicGroupId: string,
  publicUserId: string
): Promise<AddRecipeToGroupDto> => {
  const userIdByRecipeId =
    await getPublicUserIdByRecipeIdService(publicRecipeId);

  if (userIdByRecipeId !== publicUserId) {
    throw ErrorResponse("Unauthorized add recipe to group", 401);
  }

  const recipeAdded: GroupIdResponse = await pgAddRecipeToGroup(
    publicRecipeId,
    publicGroupId
  );
  const recipeAddedDto: AddRecipeToGroupDto = {
    publicId: recipeAdded.publicId,
  };

  return recipeAddedDto;
};

export const removeRecipeFromGroupService = async (
  publicRecipeId: string,
  publicGroupId: string,
  publicUserId: string
) => {
  const userIdByRecipeId =
    await getPublicUserIdByRecipeIdService(publicRecipeId);

  const isAdmin: boolean = await checkIfUserIsAdminOfGroup(publicUserId);

  if (userIdByRecipeId !== publicUserId && !isAdmin) {
    throw ErrorResponse("Unauthorized remove recipe from group", 401);
  }

  const recipeRemoved: GroupIdResponse = await pgRemoveRecipeFromGroup(
    publicRecipeId,
    publicGroupId
  );

  const recipeRemovedDto: RemoveRecipeFromGroupDto = {
    publicId: recipeRemoved.publicId,
  };

  return recipeRemovedDto;
};

export const pgAddImageToGroupService = async (
  publicGroupId: string,
  image: string
) => {
  const isAdmin: boolean = await checkIfUserIsAdminOfGroup(publicUserId);

  if (!isAdmin) throw ErrorResponse("Unauthorized edit group details", 401);

  const recipeAdded: GroupIdResponse = await pgAddImageToGroup(
    publicGroupId,
    image
  );
  return recipeAdded;
};

export const addGroupMember = async (g, userId) => {};

export const removeGroupMember = async (groupId, userId) => {};

export const isUserAdmin = async (groupId, userId) => {};
