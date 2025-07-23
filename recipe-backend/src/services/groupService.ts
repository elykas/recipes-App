import {
    pgCreateGroup,
  pgEditGroupDetails,
  pgGetGroupRecipesPreview,
  pgGetPublicUserIdByPublicGroupId,
  pgGetUserGroups,
} from "../dal/groupDal";
import { CreateGroupDto, DeleteGroupDto, GroupRecipesPreviewDto, NewGroupDto, UpdatedGroupDto, UserGroupsDto } from "../dto/groupDto";
import {
    GroupIdResponse,
  GroupMembersIdByGroupIdResponse,
  GroupRecipesResponse,
  UpdatedGroupResponse,
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

export const editGroupDetailsService = async (groupData: CreateGroupDto, publicGroupId: string) => {
  const updatedGroup: UpdatedGroupResponse = await pgEditGroupDetails(groupData, publicGroupId);

  const updatedGroupDto: UpdatedGroupDto = { 
    publicId: updatedGroup.publicId,
    name: updatedGroup.name,
    description: updatedGroup.description
   };
  return updatedGroup;
};

export const deleteGroupService = async (publicGroupId: string): Promise<DeleteGroupDto> => {
  const deletedGroup: NewGroupDto = { publicId: publicGroupId };  
  const deletedGroupDto: DeleteGroupDto = { publicId: deletedGroup.publicId };
  return deletedGroupDto;
};

export const addGroupMember = async (g, userId) => {};

export const removeGroupMember = async (groupId, userId) => {};

export const isUserAdmin = async (groupId, userId) => {};
