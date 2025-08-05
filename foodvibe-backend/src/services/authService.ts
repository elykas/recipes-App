import { pgCheckUserExist, pgCheckUsernameExist, pgCreateUser } from "../dal/authDAL";
import { CreateUserDto, UserDto } from "../dto/userDto";
import { UserWithoutRecipes } from "../types/response/userResponse";
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
  userRegisterDetails: CreateUserDto
): Promise<UserDto> => {
  const isUserExist: UserWithoutRecipes | null =
    await pgCheckUserExist(publicId);
  if (isUserExist) {
    throw errorResponse("User already exists", 400);
  }

  const isUsernameExist = await pgCheckUsernameExist(
    userRegisterDetails.username
  );
  if (isUsernameExist) {
    throw errorResponse("Username already exists", 400);
  }
  const newUser = await pgCreateUser(publicId, userRegisterDetails);
  const userDto: UserDto = mapUserToDto(newUser);
  return userDto;
};
