import { UserDto } from "../../dto/userDto";
import IUser from "../../models/userModel";
import { UserWithoutRecipes, UserWithRecipes } from "../../types/responses";

function hasRecipes(user: UserWithRecipes | UserWithoutRecipes): user is UserWithRecipes {
  return "recipes" in user;
}
export const  mapUserToDto = (user:UserWithRecipes | UserWithoutRecipes): UserDto => {
   const {
    id, username, email, phone,
    googleId, isAdmin, imageUrl, bio, 
  } = user;

  const dto: UserDto = {
    id,
    username,
    email,
    phone,
    googleId,
    isAdmin,
    imageUrl,
    bio,
  };

  if (hasRecipes(user)) {
    dto.recipes = user.recipes;
  }

  return dto;
};