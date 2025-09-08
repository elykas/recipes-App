import {
  pgDeleteUser,
  pgGetAllUsernames,
  pgGetAllUsers,
  pgGetImageOfUserByPublicId,
  pgGetUserById,
  pgGetUserIdByPublicId,
  pgGetUserProfileWithPosts,
  pgIsUsernameAvailable,
  pgUpdateUser,
  pgUpdateUserImage,
} from "../dal/userDal";
import { UpdateUserDto, UserDto, UsernameDto, UserProfileDto } from "../dto/userDto";
import {
  UsernamesResponse,
  UserProfileWithPostsResponse,
  UserWithoutRecipes,
} from "../types/response/userResponse";
import errorResponse from "../utils/errors/errors";
import { mapUserProfileToDto, mapUserToDto } from "../utils/mappers/userMapper";
import { deleteImageFromStorage, uploadSingleImage } from "./storageService";

export const getAllUsersService = async (): Promise<UserDto[]> => {
  const users: UserWithoutRecipes[] = await pgGetAllUsers();
  const recipesDto: UserDto[] = users.map(mapUserToDto);
  return recipesDto;
};

export const getUserProfileWithPostsService = async (
  currentUserPublicId: string,
  userPublicId: string,
  limit: number
): Promise<UserProfileDto> => {
  const isCurrentUserProfile = currentUserPublicId === userPublicId;
  const userProfileWithPosts: UserProfileWithPostsResponse | null =
    await pgGetUserProfileWithPosts(userPublicId, limit, isCurrentUserProfile);

  if (!userProfileWithPosts) throw errorResponse("User not found", 404);

  const userProfileWithPostsDto: UserProfileDto = mapUserProfileToDto(userProfileWithPosts);
  return userProfileWithPostsDto;
};

export const getAllUsernamesService = async (
  searchQuery: string,
  limit: number
): Promise<UsernameDto[]> => {
  const usernames: UsernamesResponse = await pgGetAllUsernames(
    searchQuery,
    limit
  );
  const usernamesDto: UsernameDto[] = usernames.map((user: UsernameDto) => ({
    ...user,
  }));
  return usernamesDto;
};

export const isUsernameAvailableService = async (
  username: string
): Promise<boolean> => {
  const isAvailable: boolean = await pgIsUsernameAvailable(username);
  return isAvailable;
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
//have to add function for delete image without update
export const updateUserImageService = async (
  publicId: string,
  image: Express.Multer.File | undefined
): Promise<UserDto> => {
  let imageUrl: string | null = null;

  if (image) {
    const imagePath: string = await uploadSingleImage(
      image.buffer,
      publicId,
      image.mimetype,
      "user"
    );
    imageUrl = imagePath;
  }
  const userWithImage: UserWithoutRecipes = await pgUpdateUserImage(
    publicId,
    imageUrl
  );

  const oldImagePath: string = await pgGetImageOfUserByPublicId(publicId);
  if (oldImagePath) {
    await deleteImageFromStorage(oldImagePath);
  }

  const userDto: UserDto = mapUserToDto(userWithImage);
  return userDto;
};
