
import { Response } from "express";

const maxAge = 7 * 24 * 60 * 60 * 1000

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie("token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: maxAge
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: maxAge
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