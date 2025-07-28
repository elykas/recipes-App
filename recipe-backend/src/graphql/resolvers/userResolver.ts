import { getUserProfileWithPostsService } from "../../services/userService";

export const userResolvers = {
  Query: {
    getUserProfileByPublicId: async (_parent, args) => {
      return getUserProfileWithPostsService(args.publicId, args.limit = 10);
    },
  },
};