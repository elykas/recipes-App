import ErrorResponse from "../../utils/errors/errors";
import { GroupMembersIdByGroupIdResponse } from "../../types/response/groupResponse";
import { getGroupMembersByGroupPublicIdService } from "../../services/groupService";

export const checkIfUserIsAdminOfGroup = async (
  userPublicId: string,
  groupPublicId: string
): Promise<boolean> => {
  const groupMembers: GroupMembersIdByGroupIdResponse =
    await checkIfUserIsMemberOfGroup(groupPublicId, userPublicId);

  const user = findUserInGroupMembers(groupMembers, userPublicId);
  if (!user || !user.admin) throw ErrorResponse("Unauthorized", 401);

  return user.admin;
};

export const checkIfUserIsMemberOfGroup = async (
  groupPublicId: string,
  userPublicId: string
): Promise<GroupMembersIdByGroupIdResponse> => {
  const groupMembersPublicId: GroupMembersIdByGroupIdResponse =
    await getGroupMembersByGroupPublicIdService(groupPublicId);

  if (!groupMembersPublicId) {
    throw ErrorResponse("Group not found", 404);
  }

  const isMember = groupMembersPublicId.members.some(
    (member: { user: { publicId: string; id: number }; admin: boolean }) =>
      member.user.publicId === userPublicId
  );

  if (!isMember) {
    throw ErrorResponse("Unauthorized: User is not a member of the group", 401);
  }

  return groupMembersPublicId;
};

export const findUserInGroupMembers = (
  groupMembers: GroupMembersIdByGroupIdResponse,
  userPublicId: string
): { admin: boolean; user: { publicId: string; id: number } } | undefined =>
  groupMembers.members.find(
    (member: { user: { publicId: string; id: number } }) =>
      member.user.publicId === userPublicId
  );
