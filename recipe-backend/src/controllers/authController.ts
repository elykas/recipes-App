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
} from "../utils/jwt";
import { setAuthCookies } from "../utils/setAuthCookies";

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
    { failureRedirect: "/login" },
    async (err: Error, user: IUser) => {
      if (err) return next(err);
      if (!user) return res.redirect("/login");

      try {
        req.logIn(user, (err) => {
          if (err) return next(err);

          if (!process.env.JWT_SECRET || !process.env.REFRESH_SECRET) {
            return res
              .status(500)
              .json({ message: "JWT secret is not defined" });
          }

          const accessToken = generateAccessToken(user.id);
          const refreshToken = generateRefreshToken(user.id);

          setAuthCookies(res, accessToken, refreshToken);

          res.redirect("/dashboard");
        });
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
    const { token } = req.query;
    if (typeof token !== "string") {
      res.status(400).json({ error: "Token is missing or invalid" });
      return;
    }

    const decoded = verifyTempToken(token);

    if (!decoded) {
      res .status(400).json({ message: "Invalid or expired token", success: false });
      return;
    }

    const user = await checkUserExist(decoded.email)
    if (user) {
      res.status(200).json({ data:user, exist:true, success: true });
    
    }else{
      res.status(200).json({data:decoded, exist: false, success: true})
    }
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
    const { email, username } = req.body;

    const user = await (async () => {
      const existingUser = await checkUserExist(email);
      return existingUser ?? await createNewUserService(email, username);
    })();

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    setAuthCookies(res, accessToken, refreshToken);

    res.status(201).json({ data: user, success: true });
  } catch (error) {
    next(error);
  }
};
