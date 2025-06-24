import  User, { IUser }  from "../models/userModel";

export const getAllUsersMongo = async (): Promise<IUser[]> => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error("Failed to fetch users");
    }
};

export const getUserByIdMongo = async (id: string): Promise<IUser> => {
    try {
        const user = await User.findById(id);
        if (!user) throw new Error("User not found");
        return user;
    } catch (error) {
        throw new Error("Failed to fetch user by ID");
    }
};

export const updateUserMongo = async (id: string, user: IUser): Promise<IUser> => {
    try {
        const {username, email, phone} = user;
        const updatedUser = await User.findByIdAndUpdate(id, {username, email, phone}, { new: true });
        if (!updatedUser) throw new Error("User not found");
        return updatedUser;
    } catch (error) {
        throw new Error("Failed to update user");
    }
};

export const deleteUserMongo = async (id: string): Promise<IUser> => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) throw new Error("User not found");
        return deletedUser;
    } catch (error) {
        throw new Error("Failed to delete user");
    }
};