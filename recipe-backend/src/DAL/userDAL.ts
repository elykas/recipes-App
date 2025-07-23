import prisma from "../config/database";
import { UpdateUserDto } from "../dto/userDto";
import { UserWithoutRecipes } from "../types/responses";

export const pgGetAllUsers = async (): Promise<UserWithoutRecipes[]> => {
  const users = await prisma.user.findMany();
  return users;
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
): Promise<UserWithoutRecipes> => {
  const updatedUser = await prisma.user.update({
    where: { publicId },
    data: {
      imageUrl,
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
