import bycrpt from "bcrypt";
import {
  mongoFindOrCreateUserToGoogleAuth,
  mongoLoginUser,
  mongoRegisterUser,
} from "../DAL/authDAL";
import { IUser } from "../models/userModel";

export const registerUserService = async (user: IUser) => {
  const { username, email, password } = user;
  if (!username || !email || !password) {
    throw new Error("Missing required fields");
  }

  const hashedPassword = await bycrpt.hash(password, 10);
  const registeredUser = await mongoRegisterUser(
    email,
    hashedPassword,
    username
  );

  return registeredUser;
};

export const loginUserService = async (email: string, password: string) => {
  const user = await mongoLoginUser(email, password);
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bycrpt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  return user;
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
