
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

export const setTempTokenCookie = (res: Response, token: string) => {
  res.cookie("tempToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 15,
    path: "/complete-register",
  });
};