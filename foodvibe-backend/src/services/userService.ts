import {
  pgDeleteUser,
  pgGetAllUsernames,
  pgGetAllUsers,
  pgGetImageOfUserByPublicId,
  pgGetUserById,
  pgGetUserIdByPublicId,
  pgGetUserProfileWithPosts,
  pgIsUsernameAvailable,
  pgUpdateUserLocale,
  pgUpdateUser,
  pgUpdateUserImage,
} from "../dal/userDal";
import {
  ImageUserDto,
  UpdateUserDto,
  UpdateUserLocaleDto,
  UserDto,
  UsernameDto,
  UserProfileDto,
  userPublicIdDto,
} from "../dto/userDto";
import {
  UpdateUserImageResponse,
  UpdateUserLocaleResponse,
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
  limit: number,
  cursor?: string
): Promise<{
  userProfileWithPostsDto: UserProfileDto;
  nextCursor: string | null;
}> => {
  const isCurrentUserProfile = currentUserPublicId === userPublicId;
  const userProfileWithPosts: UserProfileWithPostsResponse | null =
    await pgGetUserProfileWithPosts(
      userPublicId,
      limit,
      isCurrentUserProfile,
      cursor
    );

  if (!userProfileWithPosts) throw errorResponse("User not found", 404);

  const userProfileWithPostsDto: UserProfileDto =
    mapUserProfileToDto(userProfileWithPosts);
  const nextCursor = userProfileWithPosts.posts.length
    ? userProfileWithPosts.posts[userProfileWithPosts.posts.length - 1].publicId
    : null;
  return { userProfileWithPostsDto, nextCursor };
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
): Promise<ImageUserDto> => {
  let imageUrl: string | null = null;
  const oldImagePath: string = await pgGetImageOfUserByPublicId(publicId);

  if (image) {
    const imagePath: string = await uploadSingleImage(
      image.buffer,
      publicId,
      image.mimetype,
      "user"
    );
    imageUrl = imagePath;
  }
  const userWithImage: UpdateUserImageResponse = await pgUpdateUserImage(
    publicId,
    imageUrl
  );

  if (oldImagePath) {
    await deleteImageFromStorage(oldImagePath);
  }

  const imageDto: ImageUserDto = {
    publicId: userWithImage.publicId,
    imageUrl: userWithImage.imageUrl,
  };
  return imageDto;
};

export const removeUserImageService = async (
  publicId: string
): Promise<userPublicIdDto> => {
  const imagePath: string = await pgGetImageOfUserByPublicId(publicId);
  if (!imagePath) {
    throw errorResponse("User has no image to remove", 404);
  }

  const removeImage = await pgUpdateUserImage(publicId, null);

  try {
    await deleteImageFromStorage(imagePath);
  } catch (storageErr) {
    console.error(
      `Failed to delete image from storage: ${imagePath}, error:`,
      storageErr
    );
  }
  const imageDto: userPublicIdDto = {
    publicId: removeImage.publicId,
  };
  return imageDto;
};

export const updateUserLocaleService = async (
  publicId: string,
  locale: string
): Promise<UpdateUserLocaleDto> => {
  const locales = ["en", "es", "pt"];
  if (!locales.includes(locale)) {
    throw errorResponse("Invalid locale", 400);
  }
  const updatedLocale: UpdateUserLocaleResponse = await pgUpdateUserLocale(
    publicId,
    locale
  );
  const localeDto: UpdateUserLocaleDto = {
    publicId: updatedLocale.publicId,
    locale: updatedLocale.locale,
  };
  return localeDto;
};
