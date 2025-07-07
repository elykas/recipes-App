import {
  pgCheckUserExist,
  pgCreateUser,
  pgFindOrCreateUserToGoogleAuth,
} from "../dal/authDAL";
import { generateTempToken } from "../utils/authUtils/jwt";
import { sendLoginEmail } from "../utils/authUtils/sendLoginEmail";

export const checkUserExist = async (email: string) => {
  const user = await pgCheckUserExist(email);
  if (!user) {
    return null;
  }
  return user;
};

export const createNewUserService = async (email: string, username: string) => {
  const user = await pgCheckUserExist(email);
  if (user) {
    return null;
  }
  const newUser = await pgCreateUser(email, username);
  return newUser;
};

export const sendLoginLinkService = async (email: string) => {
  const token = generateTempToken(email);
  const link = `http://localhost:5173/verify-token?token=${token}`;
  await sendLoginEmail(email, link);
};

export const findOrCreateUserGoogleAuthService = async (
  googleId: string,
  username: string,
  email: string
) => {
  const user = await pgFindOrCreateUserToGoogleAuth(googleId, username, email);
  return user;
};

export const logoutUserService = (req: any) => {
  return new Promise((resolve, reject) => {
    req.logout((err: any) => {
      if (err) reject("Logout failed");
      resolve("Logged out successfully");
    });
  });
};
