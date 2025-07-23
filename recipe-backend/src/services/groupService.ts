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
} from "../dal/groupDal";
import {
  addGroupMemberDto,
  AddRecipeToGroupDto,
  CreateGroupDto,
  DeleteGroupDto,
  GroupRecipesPreviewDto,
  NewGroupDto,
  RemoveRecipeFromGroupDto,
  UpdatedGroupDto,
  UpdatedImageGroupDto,
  UserGroupsDto,
} from "../dto/groupDto";
import {
  GroupIdResponse,
  GroupMembersIdByGroupIdResponse,
  GroupRecipesResponse,
  UpdatedGroupResponse,
  UserGroupsResponse,
} from "../types/response/groupResponse";
import { checkIfUserIsAdminOfGroup } from "../utils/checkUtils/checkGroupUtils";
import ErrorResponse from "../utils/errors/errors";
import {
  groupRecipesPreviewMapper,
  userGroupsMapper,
} from "../utils/mappers/groupMapper";
import { getUserPublicIdByRecipeIdService } from "./recipeService";
import { deleteImageFromStorage, uploadSingleImage } from "./storageService";

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

export const getGroupMembersByGroupPublicIdService = async (
  publicGroupId: string
): Promise<GroupMembersIdByGroupIdResponse> => {
  const groupMembersId: GroupMembersIdByGroupIdResponse | null =
    await pgGetMembersPublicIdByPublicGroupId(publicGroupId);

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
    await getUserPublicIdByRecipeIdService(publicRecipeId);

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
    await getUserPublicIdByRecipeIdService(publicRecipeId);

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

export const updateImageToGroupService = async (
  publicGroupId: string,
  publicUserId: string,
  image: Express.Multer.File | undefined
) => {
  const isAdmin: boolean = await checkIfUserIsAdminOfGroup(publicUserId);

  if (!isAdmin) throw ErrorResponse("Unauthorized edit group details", 401);

  let imageUrl: string | null = null;
  const oldImagePath: string = await pgGetImageOfGroupByPublicId(publicGroupId);

  if (image) {
    const imagePath: string = await uploadSingleImage(
      image.buffer,
      publicUserId,
      image.mimetype,
      "group"
    );
    imageUrl = imagePath;
  }

  const imageAdded: GroupIdResponse = await pgUpdateImageOfGroup(
    publicGroupId,
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
  publicGroupId: string,
  publicUserId: string,
  memberPublicId: string
) => {
  const admin: boolean = await checkIfUserIsAdminOfGroup(publicUserId);

  if (!admin) throw ErrorResponse("Unauthorized add group member", 401);

  const memberAdded: GroupIdResponse = await pgAddGroupMember(
    publicGroupId,
    memberPublicId
  );
  const groupOfMemberDto: addGroupMemberDto = {
    publicId: memberAdded.publicId,
  };
  return groupOfMemberDto;
};

export const removeGroupMember = async (groupId, userId) => {};

export const isUserAdmin = async (groupId, userId) => {};
