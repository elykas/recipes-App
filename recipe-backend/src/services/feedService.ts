import dayjs from "dayjs";
import prisma from "../config/database";

const weekAgo = dayjs().subtract(7, "day").toDate();


export const getNewestPosts = async (limit: number) => {
  return prisma.post.findMany({
    where: {
      createdAt: {
        gte: weekAgo,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      publicId: true,
      imageUrl: true,
      _count: {
        select: {
          likes: true,
        },
      },
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
  });
};

export const getPopularPosts = async (limit: number, cursor?: {publicId: string} ) => {
    const popularPosts = await prisma.post.findMany({
    orderBy: {
      likes: {
        _count: 'desc',
      },
    },
    select: {
      publicId: true,
      imageUrl: true,
      _count: {
        select: {
          likes: true,
        },
      },
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
    cursor: cursor ? {publicId: cursor.publicId} : undefined,
    skip: cursor ? 1 : 0
  });

  return popularPosts
}

export const getPostsWithRecipes = async (limit: number) =>
  prisma.post.findMany({
    where: {
      recipe: { not: null },
      isPublished: true,
    },
    select: {
      publicId: true,
      imageUrl: true,
      _count: {
        select: {
          likes: true,
        },
      },
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
  });