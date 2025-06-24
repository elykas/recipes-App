import {Request, Response, NextFunction} from "express";
import {deleteUserService, getAllUsersService, getUserByIdService, updateUserService} from "../services/userService";
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getAllUsersService();
        res.status(200).json({success: true, users: users, message: "Users fetched successfully"})
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).userId;
        const user = await getUserByIdService(userId);
        res.status(200).json({success: true, user: user, message: "User fetched successfully"})
    } catch (error) {
        next(error);
    }       
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).userId;
        const user = req.body;
        const updatedUser = await updateUserService(userId, user);
        res.status(200).json({success: true, user: updatedUser, message: "User updated successfully"})
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).userId;
        await deleteUserService(userId);
        res.status(200).json({success: true, message: "User deleted successfully"})
    } catch (error) {
        next(error);
    }
}