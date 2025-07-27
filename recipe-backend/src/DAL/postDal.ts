import { LikeType } from "@prisma/client";
import prisma from "../config/database";
import { PostInputCreateDto, PostInputUpdateDto } from "../dto/postDto";
import {
  AuthorOfPostResponse,
  PostLikeResponse,
  PostPublicIdResponse,
  PostResponseWithId,
} from "../types/response/postResponse";

export const pgGetSomePostsById = async (postsPublicId: string[]): Promise<PostResponseWithId[]> => {
  const posts: PostResponseWithId[] = await prisma.post.findMany({
    where: { publicId: { in: postsPublicId } },
    select: {
      id: true,
      publicId: true,
    },
  });
  return posts;
}

export const pgCreatePost = async (
  post: PostInputCreateDto,
  imageUrl: string,
  userPublicId: string
): Promise<PostPublicIdResponse> => {
  const newPost: PostPublicIdResponse = await prisma.post.create({
    data: {
      content: post.content,
      ...(post.recipePublicId && {
        recipe: {
          connect: {
            publicId: post.recipePublicId,
          },
        },
      }),
      imageUrl,
      author: {
        connect: {
          publicId: userPublicId,
        },
      },
    },
    select: {
      publicId: true,
    },
  });
  return newPost;
};

export const pgUpdatePost = async (
  post: PostInputUpdateDto,
  postPublicId: string
): Promise<PostPublicIdResponse> => {
  const updatedPost: PostPublicIdResponse = await prisma.post.update({
    where: { publicId: postPublicId },
    data: {
      content: post.content,
      recipe:
        post.recipePublicId === null
          ? { disconnect: true }
          : { connect: { publicId: post.recipePublicId! } },
    },
    select: {
      publicId: true,
    },
  });
  return updatedPost;
};

export const pgGetUserPublicIdByPostId = async (
  postPublicId: string
): Promise<AuthorOfPostResponse | null> => {
  const publicUserId: AuthorOfPostResponse | null =
    await prisma.post.findUnique({
      where: { publicId: postPublicId },
      select: {
        author: {
          select: {
            id: true,
            publicId: true,
          },
        },
      },
    });

  return publicUserId;
};

export const pgGetPostIdByPublicId = async (
  postPublicId: string
): Promise<PostResponseWithId | null> => {
  const post: PostResponseWithId | null = await prisma.post.findUnique({
    where: { publicId: postPublicId },
    select: {
      id: true,
      publicId: true,
    },
  });
  return post;
};

export const pgGetImageOfPostByPublicId = async (
  postPublicId: string
): Promise<string | undefined> => {
  const imagePath = await prisma.post.findUnique({
    where: { publicId: postPublicId },
    select: { imageUrl: true },
  });
  return imagePath?.imageUrl;
};

export const pgUpdateImagePost = async (
  imageUrl: string,
  postPublicId: string
): Promise<PostPublicIdResponse> => {
  const updatedImagePost: PostPublicIdResponse = await prisma.post.update({
    where: { publicId: postPublicId },
    data: {
      imageUrl,
    },
    select: {
      publicId: true,
    },
  });
  return updatedImagePost;
};

export const pgDeletePost = async (
  postPublicId: string
): Promise<PostPublicIdResponse> => {
  const deletedPost: PostPublicIdResponse = await prisma.post.delete({
    where: { publicId: postPublicId },
    select: {
      publicId: true,
    },
  });
  return deletedPost;
};

export const pgAddLikeToPost = async (
  userId: number,
  postId: number,
  like: LikeType
): Promise<PostLikeResponse> => {
  const updatedPostWithLike: PostLikeResponse =
    await prisma.postLike.create({
      data: {
        userId,
        postId,
        type: like,
      },
      select: {
        post: {
          select: {
            publicId: true,
          },
        },
      },
    });
  return updatedPostWithLike;
};

export const pgUpdateLikeToPost = async (
  userId: number,
  postId: number,
  like: LikeType
): Promise<PostLikeResponse> => {
  const updatedPostWithLike: PostLikeResponse = await prisma.postLike.update({
    where: { userId_postId: { userId, postId } },
    data: {
      type: like,
    },
    select: {
      post: {
        select: {
          publicId: true,
        },
      },
    },
  });
  return updatedPostWithLike;
};

export const pgIsLikeExists = async (
  userId: number,
  postId: number
) => {
  const isLikeExists = await prisma.postLike.findFirst({
    where: { userId, postId},
  });
 return !!isLikeExists;
};

export const pgRemoveLikeFromPost = async (userId: number, postId: number) => {
  const postWithLike: PostLikeResponse = await prisma.postLike.delete({
    where: { userId_postId: { userId, postId } },
    select: {
      post: {
        select: {
          publicId: true,
        },
      },
    },
  });
  return postWithLike;
};