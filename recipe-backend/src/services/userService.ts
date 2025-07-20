import {
  pgAddUserImage,
  pgDeleteUser,
  pgGetAllUsers,
  pgGetImageByPublicId,
  pgGetUserById,
  pgGetUserIdByPublicId,
  pgUpdateUser,
} from "../dal/userDal";
import { UpdateUserDto, UserDto } from "../dto/userDto";
import { UserWithoutRecipes } from "../types/responses";
import errorResponse from "../utils/errors/errors";
import { mapUserToDto } from "../utils/mappers/userMapper";
import { deleteImageFromStorage, uploadSingleImage } from "./storageService";

export const getAllUsersService = async (): Promise<UserDto[]> => {
  const users: UserWithoutRecipes[] = await pgGetAllUsers();
  const recipesDto: UserDto[] = users.map(mapUserToDto);
  return recipesDto;
};

export const getUserByIdService = async (
  publicId: string
): Promise<UserDto> => {
  const user: UserWithoutRecipes | null = await pgGetUserById(publicId);
  if (!user) throw errorResponse("User not found", 404);
  const userDto: UserDto = mapUserToDto(user);
  return userDto;
};

export const getUserIdByPublicIdService = async (
  publicId: string
): Promise<number> => {
  const userId: number | null = await pgGetUserIdByPublicId(publicId);
  if (!userId) throw errorResponse("User not found", 404);
  return userId;
};

export const updateUserService = async (
  publicId: string,
  user: UpdateUserDto
): Promise<UpdateUserDto> => {
  const updatedUser: UpdateUserDto = await pgUpdateUser(publicId, user);
  return updatedUser;
};

export const deleteUserService = async (publicId: string): Promise<UserDto> => {
  const deletedUser: UserWithoutRecipes = await pgDeleteUser(publicId);
  const userDto: UserDto = mapUserToDto(deletedUser);
  return userDto;
};

export const addUserImageService = async (
  publicId: string,
  image: any
): Promise<UserDto> => {
  const oldImagePath: string = await pgGetImageByPublicId(publicId);
  if (oldImagePath) {
    await deleteImageFromStorage(oldImagePath);
  }
  const imagePath: string = await uploadSingleImage(
    image.image,
    publicId,
    image.image.mimetype,
    "user"
  );
  const userWithImage: UserWithoutRecipes = await pgAddUserImage(
    publicId,
    imagePath
  );
  const userDto: UserDto = mapUserToDto(userWithImage);
  return userDto;
};
