import { UserDto, UsernameDto } from "../../dto/userDto";
import {
 
} from "../../types/response/recipeResponses";
import { UsernamesResponse, UserWithoutRecipes, UserWithRecipes } from "../../types/response/userResponse";

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


