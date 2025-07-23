import { NextFunction, Request, Response } from "express";
import { UpdateUserDto, UserDto } from "../dto/userDto";
import {
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserImageService,
  updateUserService,
} from "../services/userService";
import { AuthenticatedRequest } from "../types/requests";
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({
      success: true,
      users: users,
      message: "Users fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { publicId } = req as AuthenticatedRequest;
    const user: UserDto = await getUserByIdService(publicId);
    res.status(200).json({
      success: true,
      user: user,
      message: "User fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { publicId } = req as AuthenticatedRequest;
    const user: UpdateUserDto = req.body;

    const updatedUser = await updateUserService(publicId, user);
    res.status(200).json({
      success: true,
      user: updatedUser,
      message: "User updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { publicId } = req as AuthenticatedRequest;

    await deleteUserService(publicId);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateUserImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { publicId } = req as AuthenticatedRequest;
    const image = req.file;
    const userWithImage = await updateUserImageService(publicId,  image );
    res.status(200).json({
      success: true,
      user: userWithImage,
      message: "User image updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
