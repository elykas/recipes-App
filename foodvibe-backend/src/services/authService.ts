import { pgCheckUserExist, pgCreateUser } from "../dal/authDAL";
import { UserDto } from "../dto/userDto";
import { UserWithoutRecipes } from "../types/response/recipeResponses";
import errorResponse from "../utils/errors/errors";
import { mapUserToDto } from "../utils/mappers/userMapper";

export const checkUserExist = async (
  publicId: string
): Promise<UserDto | null> => {
  const userByEmail: UserWithoutRecipes | null =
    await pgCheckUserExist(publicId);
  if (!userByEmail) return null;
  const userDto: UserDto = mapUserToDto(userByEmail);
  return userDto;
};

export const createNewUserService = async (
  publicId: string,
  userRegisterDetails: any
): Promise<UserDto> => {
  const isUserExist: UserWithoutRecipes | null =
    await pgCheckUserExist(publicId);
  if (isUserExist) {
    throw errorResponse("User already exists", 400);
  }
  const newUser = await pgCreateUser(publicId, userRegisterDetails);
  const userDto: UserDto = mapUserToDto(newUser);
  return userDto;
};
