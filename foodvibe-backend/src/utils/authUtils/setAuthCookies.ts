
import { Response } from "express";

const maxAge = 7 * 24 * 60 * 60 * 1000

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie("token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:  process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: maxAge
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:  process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: maxAge
  });
};


