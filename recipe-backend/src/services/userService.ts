import {
  pgDeleteUser,
  pgGetAllUsers,
  pgGetUserById,
  pgGetUserIdByPublicId,
  pgUpdateUser,
} from "../dal/userDal";
import { UpdateUserDto, UserDto } from "../dto/userDto";
import { UserWithoutRecipes } from "../types/responses";
import errorResponse from "../utils/errors/errors";
import { mapUserToDto } from "../utils/mappers/userMapper";

export const getAllUsersService = async (): Promise<UserDto[]> => {
  const users: UserWithoutRecipes[] = await pgGetAllUsers();
  const recipesDto: UserDto[] = users.map(mapUserToDto);
  return recipesDto;
};

export const getUserByIdService = async (id: number): Promise<UserDto> => {
  const user = await pgGetUserById(id);
  if (!user) throw errorResponse("User not found", 404);
  const userDto: UserDto = mapUserToDto(user);
  return userDto;
};

export const getUserIdByPublicIdService = async (
  publicId: string
): Promise<Number> => {
  const userId: Number | null = await pgGetUserIdByPublicId(publicId);
  if (!userId) throw errorResponse("User not found", 404);
  return userId;
};

export const updateUserService = async (
  id: number,
  user: UpdateUserDto
): Promise<UpdateUserDto> => {
    const updatedUser: UpdateUserDto = await pgUpdateUser(id, user);
    return updatedUser;
};

export const deleteUserService = async (id: number): Promise<UserDto> => {
    const deletedUser: UserWithoutRecipes = await pgDeleteUser(id);
    const userDto: UserDto = mapUserToDto(deletedUser);
    return userDto;
};
