
import { Response } from "express";

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie("token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/refresh-token",
  });
};

export const setTempTokenCookie = (res: Response, token: string) => {
  res.cookie("tempToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 15,
  });
};