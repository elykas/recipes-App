import  ErrorResponse  from "../../utils/errors/errors";
import {GroupMembersIdByGroupIdResponse} from "../../types/response/groupResponse";
import { getGroupMembersByGroupPublicIdService } from "../../services/groupService";

export const checkIfUserIsAdminOfGroup = async (
  currentUserPublicId: string
): Promise<boolean> => {
  const groupMembersId: GroupMembersIdByGroupIdResponse | null =
    await getGroupMembersByGroupPublicIdService(currentUserPublicId);

  if (!groupMembersId) throw ErrorResponse("Group not found", 404);

  const user = groupMembersId.members.find(
    (m: { user: { publicId: string }; admin: boolean }) =>
      m.user.publicId === currentUserPublicId
  );

  if (!user || !user.admin) throw ErrorResponse("Unauthorized", 401);

  return true;
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
    (member: { user: { publicId: string }, admin: boolean }) => member.user.publicId === userPublicId
  );

  if (!isMember) {
    throw ErrorResponse("Unauthorized: User is not a member of the group", 401);
  }

  return groupMembersPublicId;
};
