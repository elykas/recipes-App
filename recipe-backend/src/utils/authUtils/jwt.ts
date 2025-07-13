import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET as string;
const REFRESH_SECRET: string = process.env.REFRESH_SECRET as string;
const TEMP_SECRET: string = process.env.TEMP_SECRET as string;

export const generateAccessToken = (id: number, isAdmin: boolean): string => {
  if (!JWT_SECRET) {
    throw new Error("TEMP_SECRET is not defined");
  }
  const accessToken = jwt.sign({ id, isAdmin }, JWT_SECRET, {
    expiresIn: "7d",
  });
  return accessToken;
};

export const generateRefreshToken = (id: number): string => {
  if (!REFRESH_SECRET) {
    throw new Error("TEMP_SECRET is not defined");
  }
  const refreshToken = jwt.sign({ id }, REFRESH_SECRET, {
    expiresIn: "90d",
  });
  return refreshToken;
};

export const generateTempToken = (email: string): string => {
  if (!TEMP_SECRET) {
    throw new Error("TEMP_SECRET is not defined");
  }

  const tempToken = jwt.sign({ email }, TEMP_SECRET, { expiresIn: "15m" });

  return tempToken;
};

export const verifyTempToken = (token: string): { email: string } | null => {
  try {
    if (!TEMP_SECRET) {
      throw new Error("TEMP_SECRET is not defined");
    }
    return jwt.verify(token, TEMP_SECRET) as { email: string };
  } catch (error) {
      throw new Error("Failed: token expired" + error)
  }
};
