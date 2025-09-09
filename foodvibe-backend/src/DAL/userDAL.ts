import prisma from "../config/database";
import { UpdateUserDto } from "../dto/userDto";
import {
  UpdateUserImageResponse,
  UsernamesResponse,
  UserProfileWithPostsResponse,
  UserWithoutRecipes,
} from "../types/response/userResponse";

export const pgGetAllUsers = async (): Promise<UserWithoutRecipes[]> => {
  const users = await prisma.user.findMany();
  return users;
};

export const pgGetAllUsernames = async (
  searchQuery: string,
  limit: number
): Promise<UsernamesResponse> => {
  const usernames = await prisma.user.findMany({
    where: { username: { contains: searchQuery, mode: "insensitive" } },
    select: { username: true, publicId: true, fullName: true, imageUrl: true },
    take: limit,
  });
  return usernames;
};

export const pgIsUsernameAvailable = async (username: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: { username: true },
  });
  return user ? false : true;
};


export const pgGetUserProfileWithPosts = async (
  publicId: string,
  limit: number,
  isCurrentUserProfile: boolean,
  cursor? : string
): Promise<UserProfileWithPostsResponse | null> => {
  const user: UserProfileWithPostsResponse | null = await prisma.user.findUnique({
    where: { publicId },
    select: {
      publicId: true,
      username: true,
      fullName: true,
      imageUrl: true,
      email: isCurrentUserProfile,
      bio: true,
      headLine: true,
      locale: isCurrentUserProfile,
      isAdmin: isCurrentUserProfile,
      posts: {
        select: {
          publicId: true,
          imageUrl: true,
          likes: true,
          recipe: {
            select: {
              publicId: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { publicId: cursor } : undefined,
      },
    },
  });
  return user;
};

export const pgGetUserById = async (
  publicId: string
): Promise<UserWithoutRecipes | null> => {
  const user = await prisma.user.findUnique({
    where: { publicId },
  });
  return user;
};

export const pgGetUserIdByPublicId = async (
  publicId: string
): Promise<number | null> => {
  const userId = await prisma.user.findUnique({
    where: { publicId },
    select: { id: true },
  });
  return userId?.id ?? null;
};

export const pgUpdateUser = async (
  publicId: string,
  userData: UpdateUserDto
): Promise<UpdateUserDto> => {
  const updatedUser = await prisma.user.update({
    where: { publicId },
    data: {
      fullName: userData.fullName,
      headLine: userData.headLine,
      bio: userData.bio,
    },
    select: {
      publicId: true,
      fullName: true,
      headLine: true,
      bio: true,
    },
  });

  return updatedUser;
};

export const pgDeleteUser = async (
  publicId: string
): Promise<UserWithoutRecipes> => {
  const deletedUser = await prisma.user.delete({
    where: { publicId },
  });
  return deletedUser;
};

export const pgUpdateUserImage = async (
  publicId: string,
  imageUrl: string | null
): Promise<UpdateUserImageResponse> => {
  const updatedUser = await prisma.user.update({
    where: { publicId },
    data: {
      imageUrl,
    },
    select: {
      publicId: true,
      imageUrl: true,
    },
  });
  return updatedUser;
};

export const pgGetImageOfUserByPublicId = async (
  publicId: string
): Promise<string> => {
  const user = await prisma.user.findUnique({
    where: { publicId },
    select: { imageUrl: true },
  });
  return user?.imageUrl ?? "";
};
