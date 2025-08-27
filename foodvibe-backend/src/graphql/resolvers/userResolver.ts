import { getUserProfileWithPostsService } from "../../services/userService";

export const userResolvers = {
  Query: {
    getUserProfileByPublicId: async (
      _parent: any,
      args: any,
      _context: any
    ) => {
      if (!_context.publicId) {
        throw new Error("Unauthorized: User not authenticated");
      }
      if (args.limit > 30) {
        throw new Error("Limit cannot exceed 30");
      }
      try {
        const userProfile = await getUserProfileWithPostsService(
          _context.publicId,
          args.limit || 10
        );

        return userProfile
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
