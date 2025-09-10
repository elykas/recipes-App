import { NextFunction, Request, Response } from "express";
import { ImageUserDto, UpdateUserDto, UserDto, UsernameDto } from "../dto/userDto";
import {
  deleteUserService,
  getAllUsernamesService,
  getAllUsersService,
  getUserByIdService,
  isUsernameAvailableService,
  removeUserImageService,
  updateUserImageService,
  updateUserService,
} from "../services/userService";
import { AuthenticatedRequest } from "../types/requests";
import ErrorResponse from "../utils/errors/errors";
import ca from "zod/v4/locales/ca.cjs";
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

export const getAllUsernames = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const searchQuery = req.query.query as string;
    const limit = parseInt(req.query.limit as string) || 10;
    const usernames: UsernameDto[] = await getAllUsernamesService(searchQuery, limit);
    res.status(200).json({
      data: usernames,
      success: true,
      message: "Usernames fetched successfully",
    });
  } catch (error) {
    next(error);
  }
}

export const isUsernameAvailable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.params.username as string;
    if (!username) {
      throw ErrorResponse("Username is required", 400);
    }
    const isAvailable = await isUsernameAvailableService(username);
    res.status(200).json({
      success: true,
      isAvailable: isAvailable,
      message: "Username availability checked successfully",
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
      data: user,
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
      data: updatedUser,
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
    const imageUser : ImageUserDto = await updateUserImageService(publicId,  image );
    res.status(200).json({
      success: true,
      data: imageUser,
      message: "User image updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const removeUserImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { publicId } = req as AuthenticatedRequest;
    const userId = await removeUserImageService(publicId);
    res.status(200).json({
      success: true,
      data: userId,
      message: "User image removed successfully",
    });
  }catch (error) {
    next(error);
  }
};
