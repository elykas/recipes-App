
import { Response } from "express";

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie("token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/refresh-token",
  });
};