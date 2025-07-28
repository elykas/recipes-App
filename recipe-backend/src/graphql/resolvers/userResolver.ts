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
      return getUserProfileWithPostsService(args.publicId, (args.limit || 10));
    },
  },
};
