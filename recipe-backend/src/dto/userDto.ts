import { IGroup, IGroupMember } from "../models/groupModel";
import { IPost, IPostLike } from "../models/postModel";
import {
  IFavoriteRecipes as IFavoriteRecipe,
  IRecipe,
  IRecipeLikes as IRecipeLike,
} from "../models/recipeModel";
import { IUserEvents } from "../models/userModel";

export type UserDto = {
  publicId: string;
  email: string;
  username: string;
  fullName?: string;
  phone?: string;
  imageUrl?: string;
  bio?: string;
  headLine?: string;
  birthDate?: Date;
  isAdmin: boolean;
  recipes?: IRecipe[];
  posts?: IPost[];
  postLikes?: IPostLike[];
  recipeLikes?: IRecipeLike[];
  favoritesRecipes?: IFavoriteRecipe[];
  userGroups?: IGroupMember[];
  createdGroups?: IGroup[];
};

export interface CreateUserDto {
  publicId: string;
  email: string;
  username: string;
  fullName?: string;
  phone?: string;
  imageUrl?: string;
  bio?: string;
  headLine?: string;
  birthDate?: Date;
  locale?: string;
  agreedToPolicy?: boolean;
  agreedToPolicyDate?: Date;
  agreedToPolicyVersion?: string;
  userEvents?: IUserEvents[];
}

export type UpdateUserDto = {
  id: number;
  username: string;
  imageUrl?: string | null;
  bio?: string | null;
};
