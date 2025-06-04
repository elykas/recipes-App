import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/jwt";

const router = express.Router();

router.post("/refresh-token", (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      res
        .status(401)
        .json({ message: "Refresh token not found", success: false });
      return;
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET!
    ) as jwt.JwtPayload;

    const accessToken = generateAccessToken(decoded.id);
    
    res.status(200).json({ accessToken, success: true });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token", success: false });
  }
});

export default router;
