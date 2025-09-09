import { getUserProfileWithPostsService } from "../../services/userService";

export const userResolvers = {
  Query: {
    me: async (_parent: any, args: any, _context: any) => {
      try {
        if (!_context.publicId) {
          throw new Error("Unauthorized: User not authenticated, 403");
        }
        if (args.limit > 30) {
          throw new Error("Limit cannot exceed 30");
        }
        const currentUserPublicId = _context.publicId;
        const userPublicId = _context.publicId;
        const {userProfileWithPostsDto : userProfile , nextCursor} = await getUserProfileWithPostsService(
          currentUserPublicId,
          userPublicId,
          args.limit || 10
        );

        return {
          data: userProfile,
          nextCursor,
          message: "User profile fetched successfully",
          success: true,
        };
      } catch (err: any) {
        return {
          data: null,
          message: err.message || "Failed to fetch user profile",
          success: false,
        };
      }
    },
    userProfile: async (_parent: any, args: any, context: any) => {
      try {
        if (!context.publicId) {
          throw new Error("Unauthorized: not authenticated 403");
        }
        if (args.limit > 30) {
          throw new Error("Limit cannot exceed 30");
        }

        const currentUserPublicId = context.publicId;
        const userPublicId = args.publicId;

        const {userProfileWithPostsDto : userProfile , nextCursor} = await getUserProfileWithPostsService(
          currentUserPublicId,
          userPublicId,
          args.limit || 10,
          args.cursor
        );
        return {
          data: userProfile,
          nextCursor,
          message: "User profile fetched successfully",
          success: true,
        };
      } catch (err: any) {
        return {
          data: null,
          message: err.message || "Failed to fetch user profile",
          success: false,
        };
      }
    },
  },
};
