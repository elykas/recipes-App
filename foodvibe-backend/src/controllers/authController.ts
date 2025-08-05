import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CreateUserDto, UserDto } from "../dto/userDto";
import { checkUserExist, createNewUserService } from "../services/authService";
import { AuthenticatedRequest } from "../types/requests";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/authUtils/jwt";
import { setAuthCookies } from "../utils/authUtils/setAuthCookies";

export const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { publicId, email } = req as AuthenticatedRequest;

    const user: UserDto | null = await checkUserExist(publicId);

    const id = user?.publicId ?? publicId;
    const isAdmin = user?.admin ?? false;

    const accessToken = generateAccessToken(id, isAdmin);
    const refreshToken = generateRefreshToken(id);
    setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json({
      data: { publicId, email },
      success: true,
      message: "User verified successfully",
      exist: !!user,
    });
  } catch (error) {
    next(error);
  }
};

export const completeRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const  userRegisterDetails: CreateUserDto = req.body;
    const { publicId } = req as AuthenticatedRequest;

    const user: UserDto = await createNewUserService(publicId, userRegisterDetails);

    const accessToken = generateAccessToken(user.publicId, user.admin ?? false);
    const refreshToken = generateRefreshToken(user.publicId);
    setAuthCookies(res, accessToken, refreshToken);
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      res
        .status(401)
        .json({ message: "Refresh token not found", success: false });
      return;
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET!
    ) as jwt.JwtPayload;

    const user: UserDto | null = await checkUserExist(decoded.publicId);

    if (!user) {
      res.status(401).json({ message: "User not found", success: false });
      return;
    }

    const accessToken = generateAccessToken(user.publicId, user.admin ?? false);
    setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token", success: false });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.clearCookie("refreshToken", { path: "/refresh-token" });
    res.status(200).json({ message: "Logged out successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
