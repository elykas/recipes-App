import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyTempToken } from "../utils/jwt";

declare module "express" {
  interface Request {
    userId?: string;
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.token ;

    if (!token) {
      res.status(401).json({ message: "Unauthorized", success: false });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

   (req as any).userId = decoded.id;

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token", success: false });
    return;
  }
};
export const verifyTempTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.tempToken || req.body.token;
    if (typeof token !== "string" || !token) {
      res.status(401).json({ message: "Token is missing or invalid", success: false });
      return;
    }

    const decoded = verifyTempToken(token);
    if (!decoded) {
      res.status(403).json({ message: "Invalid or expired token", success: false });
      return;
    }

    (req as any).email = decoded.email;

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token", success: false });
    return;
  }
} 
