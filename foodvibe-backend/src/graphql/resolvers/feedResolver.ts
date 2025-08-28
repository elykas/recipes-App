import { getFeedService } from "../../services/feedService";
import { decodeCursor, encodeCursor } from "../../utils/feedUtils/feedUtils";

const MAX_LIMIT_PER_TYPE = 10;
const MAX_EXCLUDES_ID = 100;

export const feedResolvers = {
  Query: {
    getFeed: async (
      _parent: any,
      args: { limit?: number; cursor?: string },
      context: any
    ) => {
      try {
        const limit = args.limit;
        const cursors = args.cursor ? decodeCursor(args.cursor) : undefined;

        if (limit && limit > MAX_LIMIT_PER_TYPE) {
          throw new Error("Limit cannot exceed 10")
        }

        const feedData = await getFeedService({
          limitPerType: limit,
          cursors,
          excludeIds: context.excludeIds,
        });

        const encodedCursors = feedData.cursors
          ? encodeCursor(feedData.cursors)
          : null;

        return {
          data: feedData.items,
          cursor: encodedCursors,
          excludeIds: feedData.excludeIds,
          success: true,
          message: "Feed fetched successfully",
        };
      } catch (err: any) {
        return {
          data: [],
          cursor: null,
          excludeIds: [],
          success: false,
          message: err.message || "Failed to fetch feed",
        };
      }
    },
  },
};
