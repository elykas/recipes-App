import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

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
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

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
