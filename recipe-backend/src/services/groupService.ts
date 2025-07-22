import {
    pgCreateGroup,
  pgGetGroupRecipesPreview,
  pgGetPublicUserIdByPublicGroupId,
  pgGetUserGroups,
} from "../dal/groupDal";
import { CreateGroupDto, GroupRecipesPreviewDto, NewGroupDto, UserGroupsDto } from "../dto/groupDto";
import {
    GroupIdResponse,
  GroupMembersIdByGroupIdResponse,
  GroupRecipesResponse,
  UserGroupsResponse,
} from "../types/responses";
import ErrorResponse from "../utils/errors/errors";
import {
  groupRecipesPreviewMapper,
  userGroupsMapper,
} from "../utils/mappers/groupMapper";

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
  const newGroup: GroupIdResponse = await pgCreateGroup(groupData, publicUserId);
  const newGroupDto: NewGroupDto = { publicId: newGroup.publicId };
  return newGroupDto;
};

export const addGroupMember = async (g, userId) => {};

export const removeGroupMember = async (groupId, userId) => {};

export const isUserAdmin = async (groupId, userId) => {};
