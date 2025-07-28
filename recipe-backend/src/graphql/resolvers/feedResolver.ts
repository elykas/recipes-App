// src/graphql/resolvers/feedResolvers.ts
import { getFeedService } from "../../services/feedService";

export const feedResolvers = {
  Query: {
    getFeed: async (_parent: any, args: { limit?: number, cursor?: string }, context: any) => {
      // אפשר להשתמש ב-context לאותנטיקציה או future preference
      const limit = args.limit || 10;
      const cursor = args.cursor || null;
      return getFeedService(limit: Int, cursor: string): [Post!]!;
    },
  },
};
