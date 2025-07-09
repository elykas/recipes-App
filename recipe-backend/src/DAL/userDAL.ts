import prisma from "../config/database";
import { UpdateUserDto } from "../dto/userDto";
import IUser from "../models/userModel";
import { UserWithoutRecipes, UserWithRecipes } from "../types/responses";

export const pgGetAllUsers = async (): Promise<UserWithoutRecipes[]> => {
  const users = await prisma.user.findMany();
  return users;
};

export const pgGetUserById = async (
  id: number
): Promise<UserWithRecipes | null> => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      recipes: {
        include: {
          ingredients: true,
          categories: true,
        },
      },
    },
  });
  return user;
};

export const pgUpdateUser = async (
  id: number,
  userData: UpdateUserDto
): Promise<UpdateUserDto> => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      username: userData.username,
      imageUrl: userData.imageUrl,
      bio: userData.bio,
    },
    select: {
      id: true,
      username: true,
      imageUrl: true,
      bio: true,
    },
  });

  return updatedUser;
};

export const pgDeleteUser = async (id: number): Promise<UserWithoutRecipes> => {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    return deletedUser;
};
