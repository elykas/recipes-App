import { pgGetMembersPublicIdByPublicGroupId } from "../../dal/groupDal";
import { getGroupMembersByGroupPublicIdService } from "../../services/groupService";
import { getUserIdByPublicIdService } from "../../services/userService";
import { GroupMembersIdByGroupIdResponse } from "../../types/response/groupResponse";
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
