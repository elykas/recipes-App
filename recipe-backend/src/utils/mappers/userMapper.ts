import { UserDto } from "../../dto/userDto";
import { UserWithoutRecipes, UserWithRecipes } from "../../types/responses";

export const mapUserToDto = (
  user: UserWithRecipes | UserWithoutRecipes
): UserDto => {
  const {
    publicId,
    username,
    email,
    fullName,
    phone,
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
    phone,
    imageUrl,
    bio,
    headLine,
    birthDate,
  };
  return dto;
};
