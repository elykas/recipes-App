import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { IUser } from "../models/userModel";
import {
  checkUserExist,
  createNewUserService,
  findOrCreateUserGoogleAuthService,
  sendLoginLinkService,
} from "../services/authService";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyTempToken,
} from "../utils/authUtils/jwt";
import { setAuthCookies, setTempTokenCookie } from "../utils/authUtils/setAuthCookies";

const CLIENT_URL = process.env.CLIENT_URL as string;

export const googleAuth = passport.authenticate("google", {
  scope: ["email", "profile"],
});

export const googleAuthCallback = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "google",
    { failureRedirect: "/login", session: false },
    async (err: Error, user: IUser) => {
      if (err) return next(err);
      if (!user) return res.redirect("/login");

      try {
        if (!process.env.JWT_SECRET || !process.env.REFRESH_SECRET) {
          return res
            .status(500)
            .json({ success: false, message: "JWT secret is not defined" });
        }

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        setAuthCookies(res, accessToken, refreshToken);

        res.redirect(`${CLIENT_URL}/dashboard`);
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
    const user = await findOrCreateUserGoogleAuthService(
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

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = (req as any).email;
    const { token } = req.body;

    const user = await checkUserExist(email);

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
    const { email } = (req as any);

    const user = await createNewUserService(email, username);

    if (!user) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    setAuthCookies(res, accessToken, refreshToken);
    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};
