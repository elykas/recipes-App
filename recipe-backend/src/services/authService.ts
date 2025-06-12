import {
  mongoCheckUserExist,
  mongoCreateUser,
  mongoFindOrCreateUserToGoogleAuth,
} from "../DAL/authDAL";
import { generateTempToken } from "../utils/jwt";
import { sendLoginEmail } from "../utils/sendLoginEmail"

export const checkUserExist = async (email: string) => {
  const user = await mongoCheckUserExist(email);
  if (!user) {
    return null;
  }
  return user;
};

export const createNewUserService = async(email: string, username: string) => {
    const newUser = await mongoCreateUser(email, username)
    return newUser
}

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
  const user = await mongoFindOrCreateUserToGoogleAuth(
    googleId,
    username,
    email
  );
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
