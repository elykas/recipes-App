// import {
//   pgCheckUserExist,
//   pgCreateUser,
//   pgFindOrCreateUserToGoogleAuth,
// } from "../dal/authDAL";
// import { UserDto } from "../dto/userDto";
// import { UserWithoutRecipes } from "../types/responses";
// import { generateAuthToken } from "../utils/authUtils/jwt";
// import { sendLoginEmail } from "../utils/authUtils/sendLoginEmail";
// import errorResponse from "../utils/errors/errors";
// import { mapUserToDto } from "../utils/mappers/userMapper";

// export const checkUserExist = async (
//   publicId: string
// ): Promise<UserDto | null> => {
//   const userByEmail: UserWithoutRecipes | null = await pgCheckUserExist(publicId);
//   if (!userByEmail) return null;
//   const userDto: UserDto = mapUserToDto(userByEmail);
//   return userDto;
// };

// export const createNewUserService = async (
//   publicId: string,
//   userRegisterDetails: any
// ): Promise<UserDto> => {
//   const isUserExist: UserWithoutRecipes | null = await pgCheckUserExist(publicId);
//   if (isUserExist) {
//     throw errorResponse("User already exists", 400);
//   }
//   const newUser = await pgCreateUser(publicId, userRegisterDetails);
//   const userDto: UserDto = mapUserToDto(newUser);
//   return userDto;
// };

// export const sendLoginLinkService = async (email: string): Promise<void> => {
//   const token: string = generateAuthToken(email);
//   const link: string = `http://localhost:5173/verify-token?token=${token}`;
//   await sendLoginEmail(email, link);
// };

// export const findOrCreateUserGoogleAuthService = async (
//   googleId: string,
//   username: string,
//   email: string
// ): Promise<UserDto> => {
//   const user: UserWithoutRecipes = await pgFindOrCreateUserToGoogleAuth(
//     googleId,
//     username,
//     email
//   );
//   const userDto: UserDto = mapUserToDto(user);
//   return userDto;
// };

// export const logoutUserService = (req: any) => {
//   return new Promise((resolve, reject) => {
//     req.logout((err: any) => {
//       if (err) reject("Logout failed");
//       resolve("Logged out successfully");
//     });
//   });
// };
