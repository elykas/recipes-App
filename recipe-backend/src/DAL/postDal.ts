import prisma from "../config/database";
import { PostInputCreateDto, PostInputUpdateDto } from "../dto/postDto";
import {
  AuthorOfPostResponse,
  PostIdResponse,
} from "../types/response/postResponse";

export const pgCreatePost = async (
  post: PostInputCreateDto,
  imageUrl: string,
  userPublicId: string
): Promise<PostIdResponse> => {
  const newPost: PostIdResponse = await prisma.post.create({
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
): Promise<PostIdResponse> => {
  const updatedPost: PostIdResponse = await prisma.post.update({
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

export const pgGetImageOfPostByPublicId = async (postPublicId: string): Promise<string | undefined> => {
  const imagePath = await prisma.post.findUnique({
    where: { publicId: postPublicId },
    select: { imageUrl: true },
  });
  return imagePath?.imageUrl;
}

export const pgUpdateImagePost = async (imageUrl: string, postPublicId: string): Promise<PostIdResponse> => {
  const updatedImagePost: PostIdResponse = await prisma.post.update({
    where: { publicId: postPublicId },
    data: {
      imageUrl,
    },
    select: {
      publicId: true,
    },
  });
  return updatedImagePost;
}

export const pgDeletePost = async (postPublicId: string): Promise<PostIdResponse> => {
  const deletedPost: PostIdResponse = await prisma.post.delete({
    where: { publicId: postPublicId },
    select: {
      publicId: true,
    },
  });
  return deletedPost;
}