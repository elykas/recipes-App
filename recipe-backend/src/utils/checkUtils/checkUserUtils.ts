import { pgGetPublicUserIdByPublicGroupId } from "../../dal/groupDal";
import { getGroupMembersByGroupPublicIdService } from "../../services/groupService";
import { getUserIdByPublicIdService } from "../../services/userService";
import { GroupMembersIdByGroupIdResponse } from "../../types/responses";
import errorResponse, { ErrorResponse } from "../errors/errors";
export const checkUserIsOwnerAndGetId = async (
  currentUserPublicId: string,
  targetUserPublicId: string
): Promise<number | undefined> => {
  let userId: number | undefined;

  if (targetUserPublicId === currentUserPublicId) {
    const fetchedUserId = await getUserIdByPublicIdService(targetUserPublicId);
    if (!fetchedUserId) throw errorResponse("User not found", 404);
    userId = fetchedUserId;
  }
  return userId;
};

export const checkUserIsOwnerAndGetIds = async (
  currentUserPublicId: string,
  targetUserPublicIds: (string | null)[]
): Promise<number | undefined> => {
  const allOwnedByCurrentUser = targetUserPublicIds.every(
    (id) => id === currentUserPublicId
  );

  if (allOwnedByCurrentUser) {
    const userId = await getUserIdByPublicIdService(currentUserPublicId);
    if (!userId) throw errorResponse("User not found", 404);
    return userId;
  }

  const otherUserIds = targetUserPublicIds.filter(
    (id) => id !== currentUserPublicId && id !== null
  );

  const allSameOtherUser =
    otherUserIds.length > 0 &&
    otherUserIds.every((id) => id === otherUserIds[0]);

  if (allSameOtherUser) {
    return undefined;
  }

  throw errorResponse("Ownership mismatch or inconsistent authors", 400);
};

export const checkIfUserIsAdminOfGroup = async (
  currentUserPublicId: string
): Promise<boolean> => {
  const groupMembersId: GroupMembersIdByGroupIdResponse | null =
    await pgGetPublicUserIdByPublicGroupId(currentUserPublicId);

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
    throw errorResponse("Group not found", 404);
  }

  const isMember = groupMembersPublicId.members.some(
    (member) => member.user.publicId === userPublicId
  );

  if (!isMember) {
    throw errorResponse("Unauthorized: User is not a member of the group", 401);
  }

  return groupMembersPublicId;
};
