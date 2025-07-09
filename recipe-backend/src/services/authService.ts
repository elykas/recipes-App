import {
  pgCheckUserExist,
  pgCreateUser,
  pgFindOrCreateUserToGoogleAuth,
} from "../dal/authDAL";
import { UserDto } from "../dto/userDto";
import { UserWithoutRecipes } from "../types/responses";
import { generateTempToken } from "../utils/authUtils/jwt";
import { sendLoginEmail } from "../utils/authUtils/sendLoginEmail";
import errorResponse from "../utils/errors/errors";
import { mapUserToDto } from "../utils/mappers/userMapper";

export const checkUserExist = async (email: string): Promise<UserDto | null> => {
  const userByEmail: UserWithoutRecipes | null = await pgCheckUserExist({email});
  if (!userByEmail) return null;
  const userDto: UserDto = mapUserToDto(userByEmail);
  return userDto;
};

export const createNewUserService = async (email: string, username: string): Promise<UserDto> => {
  const userByEmail: UserWithoutRecipes | null = await pgCheckUserExist({ email });
  if (userByEmail) {
    throw errorResponse("User already exists", 400);
  }
  const newUser = await pgCreateUser(email, username);
  const userDto: UserDto = mapUserToDto(newUser);
  return userDto;
};

export const sendLoginLinkService = async (email: string): Promise<void> => {
  const token: string = generateTempToken(email);
  const link: string = `http://localhost:5173/verify-token?token=${token}`;
  await sendLoginEmail(email, link);
};

export const findOrCreateUserGoogleAuthService = async (
  googleId: string,
  username: string,
  email: string
): Promise<UserDto> => {
  const user: UserWithoutRecipes = await pgFindOrCreateUserToGoogleAuth(googleId, username, email);
  const userDto: UserDto = mapUserToDto(user);
  return userDto;
};

export const logoutUserService = (req: any) => {
  return new Promise((resolve, reject) => {
    req.logout((err: any) => {
      if (err) reject("Logout failed");
      resolve("Logged out successfully");
    });
  });
};
