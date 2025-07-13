
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const extractUserFromToken = (req: Request): JwtPayload | null => {
  try {
    const token = req.cookies?.token;
    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (err) {
    return null;
  }
};
