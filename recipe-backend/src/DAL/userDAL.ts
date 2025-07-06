import  IUser from "../models/userModel";
import prisma from "../config/database";

export const pgGetAllUsers = async (): Promise<IUser[]> => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw new Error("Failed to fetch users: " + error);
  }
};

export const pgGetUserById = async (id: number): Promise<IUser> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user by ID: " + error);
  }
};

export const pgUpdateUser = async (
  id: number,userData: Partial<IUser>): Promise<IUser> => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: userData,
    });
    return updatedUser;
  } catch (error) {
    throw new Error("Failed to update user: " + error);
  }
};


export const pgDeleteUser = async (id: number): Promise<IUser> => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    return deletedUser;
  } catch (error) {
    throw new Error("Failed to delete user: " + error);
  }
};
