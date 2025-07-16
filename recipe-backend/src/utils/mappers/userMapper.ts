import { UserDto } from "../../dto/userDto";
import { UserWithoutRecipes, UserWithRecipes } from "../../types/responses";

function hasRecipes(user: UserWithRecipes | UserWithoutRecipes): user is UserWithRecipes {
  return "recipes" in user;
}

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
    isAdmin,
    posts,
    postLikes,
    recipeLikes,
    favoritesRecipes,
    userGroups,
    createdGroups,
  } = user;

  const dto: UserDto = {
    publicId,
    username,
    email,
    isAdmin,
    fullName,
    phone,
    imageUrl,
    bio,
    headLine,
    birthDate,
  };

  if (hasRecipes(user)) {
    dto.recipes = user.recipes;
  }

  // קשרים אופציונליים – אם קיימים נוסיף אותם
  if (posts) dto.posts = posts;
  if (postLikes) dto.postLikes = postLikes;
  if (recipeLikes) dto.recipeLikes = recipeLikes;
  if (favoritesRecipes) dto.favoritesRecipes = favoritesRecipes;
  if (userGroups) dto.userGroups = userGroups;
  if (createdGroups) dto.createdGroups = createdGroups;

  return dto;
};
