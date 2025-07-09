import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { UserDto } from "../dto/userDto";
import { IUser } from "../models/userModel";
import {
  checkUserExist,
  createNewUserService,
  findOrCreateUserGoogleAuthService,
  sendLoginLinkService,
} from "../services/authService";
import { TempTokenRequest } from "../types/requests";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/authUtils/jwt";
import {
  setAuthCookies,
  setTempTokenCookie,
} from "../utils/authUtils/setAuthCookies";

const CLIENT_URL = process.env.CLIENT_URL as string;

export const googleAuth = passport.authenticate("google", {
  scope: ["email", "profile"],
  prompt: "select_account",
});

export const googleAuthCallback = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "google",
    { failureRedirect: `${CLIENT_URL}/login`, session: false },
    async (err: Error, user: IUser) => {
      if (err) return next(err);
      if (!user) return res.redirect(`${CLIENT_URL}/login`);

      try {
        if (!process.env.JWT_SECRET || !process.env.REFRESH_SECRET) {
          return res
            .status(500)
            .json({ success: false, message: "JWT secret is not defined" });
        }
        if (user.id === undefined) {
          return res
            .status(500)
            .json({ success: false, message: "User ID is missing" });
        }

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        setAuthCookies(res, accessToken, refreshToken);
        res.redirect(`${CLIENT_URL}`);
      } catch (error) {
        next(error);
      }
    }
  )(req, res, next);
};

export const handleGoogleCallback = async (
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: Function
) => {
  const email =
    profile.emails && profile.emails.length > 0
      ? profile.emails[0].value
      : null;

  try {
    const user: UserDto = await findOrCreateUserGoogleAuthService(
      profile.id,
      profile.displayName,
      email
    );
    return done(null, user);
  } catch (error) {
    return done(error);
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

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    await sendLoginLinkService(email);
    res.status(200).json({ message: "Verification email sent", success: true });
  } catch (error) {
    next(error);
  }
};

export const verifyTempToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {email} = req as TempTokenRequest;
    const { token } = req.body;

    const user: UserDto | null = await checkUserExist(email);

    if (user) {
      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);
      setAuthCookies(res, accessToken, refreshToken);
    } else {
      setTempTokenCookie(res, token);
    }
    res.status(200).json({
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
    const { username } = req.body;
    const { email } = req as TempTokenRequest;

    const user: UserDto = await createNewUserService(email, username);

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    setAuthCookies(res, accessToken, refreshToken);
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = (req: Request, res: Response) => {
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

    const accessToken = generateAccessToken(decoded.id);
    setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token", success: false });
  }
};
