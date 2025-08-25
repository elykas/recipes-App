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

      try {
        const userProfile = await getUserProfileWithPostsService(
          args.publicId,
          args.limit || 10
        );

        return {
          data: userProfile,
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
