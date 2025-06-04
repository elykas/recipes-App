import jwt from "jsonwebtoken";
import { IUser } from "../models/userModel";

const JWT_SECRET: string = process.env.JWT_SECRET as string;
const REFRESH_SECRET: string = process.env.REFRESH_SECRET as string;

export const generateAccessToken = (id: string): string => {
  const accessToken = jwt.sign({id}, JWT_SECRET, {
    expiresIn: "1h",
  });
  return accessToken;
};

export const generateRefreshToken = (id: string): string => {
  const refreshToken = jwt.sign({ id}, REFRESH_SECRET, {
    expiresIn: "15m",
  });
  return refreshToken
};
