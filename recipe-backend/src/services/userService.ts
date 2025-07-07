import {
  pgDeleteUser,
  pgGetAllUsers,
  pgGetUserById,
  pgUpdateUser,
} from "../dal/userDAL";
import { IUser } from "../models/userModel";

export const getAllUsersService = async () => {
  try {
    const users = await pgGetAllUsers();
    return users;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export const getUserByIdService = async (id: number) => {
  try {
    const user = await pgGetUserById(id);
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user by ID" + error);
  }
};

export const updateUserService = async (id: number, user: Partial<IUser>) => {
  try {
    const updatedUser = await pgUpdateUser(id, user);
    return updatedUser;
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

export const deleteUserService = async (id: number) => {
  try {
    const deletedUser = await pgDeleteUser(id);
    return deletedUser;
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};
