import errorResponse  from "../errors/errors";
import { getUserIdByPublicIdService } from "../../services/userService";
export const checkUserIsOwnerAndGetId = async(currentUserPublicId: string, targetUserPublicId: string): Promise<number | undefined> => {
    let userId: number | undefined;

    if (targetUserPublicId === currentUserPublicId) {
        const fetchedUserId = await getUserIdByPublicIdService(targetUserPublicId);
        if (!fetchedUserId) throw errorResponse("User not found", 404);
        userId = fetchedUserId;
    }
    return userId
};