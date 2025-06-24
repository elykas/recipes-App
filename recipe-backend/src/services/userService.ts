import { deleteUserMongo, getAllUsersMongo, getUserByIdMongo, updateUserMongo } from "../DAL/userDAL";
import { IUser } from "../models/userModel";

export const getAllUsersService = async () => {
    try {
        const users = await getAllUsersMongo();
        return users;
    } catch (error) {
        throw new Error("Failed to fetch users");
    }
};

export const getUserByIdService = async (id: string) => {
    try {
        const user = await getUserByIdMongo(id);
        return user;
    } catch (error) {
        throw new Error("Failed to fetch user by ID");
    }
};

export const updateUserService = async (id: string, user: IUser) => {
    try {
        const updatedUser = await updateUserMongo(id, user);
        return updatedUser;
    } catch (error) {
        throw new Error("Failed to update user");
    }
};

export const deleteUserService = async (id: string) => {
    try {
        const deletedUser = await deleteUserMongo(id);
        return deletedUser; 
    } catch (error) {
        throw new Error("Failed to delete user");
    }
}