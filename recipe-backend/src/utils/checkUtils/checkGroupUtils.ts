import ErrorResponse from "../../utils/errors/errors";
import { GroupMembersIdByGroupIdResponse, MemberOfGroupResponse } from "../../types/response/groupResponse";
import { getMemberOfGroupService } from "../../services/groupService";

export const checkIfUserIsAdminOfGroup = async (
  userPublicId: string,
  groupPublicId: string
): Promise<boolean> => {
  const groupMember: MemberOfGroupResponse = await getMemberOfGroupService(
      userPublicId,
      groupPublicId
    );

  if (!groupMember || !groupMember.admin) throw ErrorResponse("Unauthorized the user is not admin", 401);

  return groupMember.admin;
};

export const checkIfUserIsMemberOfGroup = async (
  groupPublicId: string,
  userPublicId: string
): Promise<MemberOfGroupResponse> => {
  const groupMember: MemberOfGroupResponse = await getMemberOfGroupService(
        userPublicId,
        groupPublicId
      );
  if (!groupMember) throw ErrorResponse("Member not belonging to group", 404);

  return groupMember;
};

export const findUserInGroupMembers = (
  groupMembers: GroupMembersIdByGroupIdResponse,
  userPublicId: string
): { admin: boolean; user: { publicId: string; id: number } } | undefined =>
  groupMembers.members.find(
    (member: { user: { publicId: string; id: number } }) =>
      member.user.publicId === userPublicId
  );
