import {
  getPopularPosts,
  getPostsWithRecipes,
  getRandomPostsWithRecipes,
  pgGetNewestPosts,
} from "../DAL/feedDal";
import { FeedDto } from "../dto/feedDto";
import { trimExcludesId } from "../utils/feedUtils/feedUtils";
import { mapToFeedDto} from "../utils/mappers/feedMapper";

export const getFeedService = async ({
  limitPerType = 5,
  cursors,
  excludeIds = [],
}: {
  limitPerType?: number;
  cursors?: {
    newestPostCursor?: { createdAt: Date; publicId: string };
    popularPostCursor?: { likeCount: number; publicId: string };
    withRecipePostCursor?: { createdAt: Date; publicId: string };
  };
  excludeIds?: string[];
}): Promise<{ items: FeedDto[]; cursors?: any, excludeIds?: string[] }> => {
  const [newest, popular, withRecipes, random] = await Promise.all([
    pgGetNewestPosts(limitPerType, cursors?.newestPostCursor),
    getPopularPosts(limitPerType, cursors?.popularPostCursor),
    getPostsWithRecipes(limitPerType, cursors?.withRecipePostCursor),
    getRandomPostsWithRecipes(limitPerType, excludeIds),
  ]);

  const allItems = [...newest, ...popular, ...withRecipes, ...random];

  const uniqueItemsMap = new Map<string, (typeof allItems)[number]>();
  allItems.forEach((item) => {
    if (!uniqueItemsMap.has(item.publicId)) {
      uniqueItemsMap.set(item.publicId, item);
    }
  });

  const finalItems = Array.from(uniqueItemsMap.values());

  const finalItemsDto: FeedDto[] = finalItems.map(mapToFeedDto);

  return {
    items: finalItemsDto,
    cursors: {
      newestPostCursor:
        newest.length > 0
          ? {
              createdAt: newest[newest.length - 1].createdAt,
              publicId: newest[newest.length - 1].publicId,
            }
          : cursors?.newestPostCursor,
      popularPostCursor:
        popular.length > 0
          ? {
              likeCount: popular[popular.length - 1].likeCount,
              publicId: popular[popular.length - 1].publicId,
            }
          : cursors?.popularPostCursor,
      withRecipePostCursor:
        withRecipes.length > 0
          ? {
              createdAt: withRecipes[withRecipes.length - 1].createdAt,
              publicId: withRecipes[withRecipes.length - 1].publicId,
            }
          : cursors?.withRecipePostCursor,
    },
    excludeIds: trimExcludesId([
      ...excludeIds,
      ...finalItems.map((i) => i.publicId),
    ]),
  };
};
