import dayjs from "dayjs";
import prisma from "../config/database";
import { FeedResponse } from "../types/response/feedResponse";
import { getRandomItems } from "../utils/feedUtils/feedUtils";

const weekAgo = dayjs().subtract(7, "day").toDate();

export const pgGetNewestPosts = async (
  limit: number,
  cursor?: { createdAt: Date; publicId: string }
): Promise<FeedResponse[]> => {
  return prisma.post.findMany({
    where: {
      createdAt: {
        gte: weekAgo,
      },
    },
    orderBy: [{ createdAt: "desc" }, { publicId: "desc" }],
    select: {
      publicId: true,
      imageUrl: true,
      likeCount: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          publicId: true,
          username: true,
          fullName: true,
          imageUrl: true,
        },
      },
      recipe: {
        select: {
          publicId: true,
        },
      },
    },
    take: limit,
    skip: cursor ? 1 : 0,
    cursor: cursor
      ? {
          createdAt_publicId: {
            createdAt: cursor.createdAt,
            publicId: cursor.publicId,
          },
        }
      : undefined,
  });
};

export const getPopularPosts = async (
  limit: number,
  cursor?: { publicId: string; likeCount: number }
): Promise<FeedResponse[]> => {
  const popularPosts = await prisma.post.findMany({
    orderBy: [{ likeCount: "desc" }, { publicId: "desc" }],
    select: {
      publicId: true,
      imageUrl: true,
      content: true,
      likeCount: true,
      createdAt: true,
      author: {
        select: {
          publicId: true,
          username: true,
          fullName: true,
          imageUrl: true,
        },
      },
      recipe: {
        select: {
          publicId: true,
        },
      },
    },
    take: limit,
    cursor: cursor
      ? {
          likeCount_publicId: {
            likeCount: cursor.likeCount,
            publicId: cursor.publicId,
          },
        }
      : undefined,
    skip: cursor ? 1 : 0,
  });

  return popularPosts;
};

export const getPostsWithRecipes = async (
  limit: number,
  cursor?: { publicId: string; createdAt: Date }
): Promise<FeedResponse[]> => {
  const postsWithRecipeLink = await prisma.post.findMany({
    where: {
      recipeId: { not: null },
    },
    orderBy: [{ createdAt: "desc" }, { publicId: "desc" }],
    select: {
      publicId: true,
      imageUrl: true,
      content: true,
      likeCount: true,
      createdAt: true,
      author: {
        select: {
          publicId: true,
          username: true,
          fullName: true,
          imageUrl: true,
        },
      },
      recipe: {
        select: {
          publicId: true,
        },
      },
    },
    take: limit,
    cursor: cursor
      ? {
          createdAt_publicId: {
            createdAt: cursor.createdAt,
            publicId: cursor.publicId,
          },
        }
      : undefined,
    skip: cursor ? 1 : 0,
  });
  return postsWithRecipeLink;
};

export const getRandomPostsWithRecipes = async (
  limit: number,
  excludesid?: string[]
): Promise<FeedResponse[]> => {
  const allPostIds = await prisma.post.findMany({
    where: { publicId: { notIn: excludesid } },
    select: { publicId: true },
  });

  const randomIds = getRandomItems(
    allPostIds.map((p) => p.publicId),
    limit
  );

  const allPosts = await prisma.post.findMany({
    where: { publicId: { in: randomIds } },
    select: {
      publicId: true,
      imageUrl: true,
      content: true,    
      likeCount: true,
      createdAt: true,
      author: {
        select: {
          publicId: true,
          username: true,
          fullName: true,
          imageUrl: true,
        },
      },
      recipe: {
        select: {
          publicId: true,
        },
      },
    },
  });
  return allPosts;
};
