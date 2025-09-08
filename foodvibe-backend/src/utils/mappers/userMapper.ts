import { UserDto, UsernameDto, UserProfileDto } from "../../dto/userDto";
import {
 
} from "../../types/response/recipeResponses";
import { UsernamesResponse, UserProfileWithPostsResponse, UserWithoutRecipes, UserWithRecipes } from "../../types/response/userResponse";

export const mapUserToDto = (
  user: UserWithRecipes | UserWithoutRecipes
): UserDto => {
  const {
    publicId,
    username,
    email,
    fullName,
    imageUrl,
    bio,
    headLine,
    birthDate,
  } = user;

  const dto: UserDto = {
    publicId,
    username,
    email,
    fullName,
    imageUrl,
    bio,
    headLine,
    birthDate,
  };
  return dto;
};

export const mapUserProfileToDto = (
  user: UserProfileWithPostsResponse
): UserProfileDto => {
   return {
    publicId: user.publicId,
    username: user.username,
    fullName: user.fullName,
    imageUrl: user.imageUrl,
    email: user.email ?? null,
    bio: user.bio,
    headLine: user.headLine,
    locale: user.locale ?? null,
    isAdmin: user.isAdmin ?? false,
    posts: user.posts.map(post => ({
      publicId: post.publicId,
      imageUrl: post.imageUrl,
      likes: post.likes.length,
      recipePublicId: post.recipe?.publicId ?? null,
    }))
  };
};
