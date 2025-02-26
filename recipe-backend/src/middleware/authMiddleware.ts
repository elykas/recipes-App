import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Extend the Request interface to include userId
declare module 'express' {
  interface Request {
    userId?: string;
  }
}

const JWT_SECRET = process.env.JWT_SECRET || '';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized', success: false });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    req.userId = decoded.id; // Attach userId to the request object

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token', success: false });
  }
};
