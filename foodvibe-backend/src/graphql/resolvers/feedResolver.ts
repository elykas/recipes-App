// src/graphql/resolvers/feedResolvers.ts
import { getFeedService } from "../../services/feedService";
import { decodeCursor, encodeCursor } from "../../utils/feedUtils/feedUtils";

export const feedResolvers = {
  Query: {
    getFeed: async (
      _parent: any,
      args: { limit?: number; cursor?: string },
      context: any
    ) => {

      const limit = args.limit;
      const cursors = args.cursor ? decodeCursor(args.cursor) : undefined;

      const feedData = await getFeedService({
        limitPerType: limit,
        cursors,
        excludeIds: context.excludeIds,
      });

      const encodedCursors = feedData.cursors
        ? encodeCursor(feedData.cursors)
        : null;
     
        return { data: feedData.items, cursor: encodedCursors, excludeIds: feedData.excludeIds };
    },
  },
};
