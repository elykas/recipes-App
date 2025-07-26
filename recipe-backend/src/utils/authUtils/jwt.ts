import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ErrorResponse from "../errors/errors";

const SUPABASE_JWT_SECRET: string = process.env.SUPABASE_JWY_SECRET as string;
const JWT_SECRET: string = process.env.JWT_SECRET as string;
const REFRESH_SECRET: string = process.env.REFRESH_SECRET as string;
const JWT_SECRET_INVITE_LINK: string = process.env.JWT_SECRET_INVITE_LINK as string;

export const generateAccessToken = (publicId: string, isAdmin: boolean): string => {
  if (!JWT_SECRET) {
    throw ErrorResponse("JWT_SECRET is not defined", 403);
  }
  const accessToken = jwt.sign({ publicId, isAdmin }, JWT_SECRET, {
    expiresIn: "7d",
  });
  return accessToken;
};

export const VerifyUserToken = (req: Request): JwtPayload => {
  const token = req.cookies?.token;

  if (!token) {
    throw new Error("Token not found");
  }

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  //try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  // } catch (err) {
  //   throw new Error("Invalid token");
  // }
};

export const generateRefreshToken = (publicId: string): string => {
  if (!REFRESH_SECRET) {
    throw ErrorResponse("REFRESH_SECRET is not defined", 403);
  }
  const refreshToken = jwt.sign({ publicId }, REFRESH_SECRET, {
    expiresIn: "90d",
  });
  return refreshToken;
};

export const verifyAuthToken = (token: string): { sub: string } | null => {
    if (!token) {
      throw ErrorResponse("Token not found", 403);
    }
    if (!SUPABASE_JWT_SECRET) {
      throw ErrorResponse("SUPABASE_JWT_SECRET is not defined", 403);
    }
    // try {
    return jwt.verify(token, SUPABASE_JWT_SECRET) as { sub: string };
  // } catch (err) {
  //   throw new Error("Invalid token");
  // }
    
};

export const generateInviteToken = (groupPublicId: string): string => {
  if (!JWT_SECRET_INVITE_LINK) {
    throw ErrorResponse("JWT_SECRET_INVITE_LINK is not defined", 403);
  }
  const inviteToken = jwt.sign({ groupPublicId }, JWT_SECRET_INVITE_LINK, {
    expiresIn: "1d",
  });
  return inviteToken;
}
