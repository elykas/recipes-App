import { IGroup, IGroupMember } from "../models/groupModel";
import { IPost, IPostLike } from "../models/postModel";
import {
  IFavoriteRecipes as IFavoriteRecipe,
  IRecipe,
  IRecipeLikes as IRecipeLike,
} from "../models/recipeModel";
import { IUserEvents } from "../models/userModel";
import { PostPreviewDto } from "./postDto";

export type UserDto = {
  publicId: string;
  email: string | null;
  username: string;
  fullName?: string | null;
  phone?: string | null;
  imageUrl?: string | null;
  admin?: boolean;
  bio?: string | null;
  headLine?: string | null;
  birthDate?: Date | null;
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
  agreedToPolicy: boolean;
  agreedToPolicyDate: Date;
  agreedToPolicyVersion: string;
  userEvents?: IUserEvents[];
}

export type UpdateUserDto = {
  publicId: string;
  fullName?: string | null;
  headLine?: string | null;
  bio?: string | null;
};

export type UsernameDto = {
  username: string;
  publicId: string;
  fullName?: string | null;
  imageUrl?: string | null;
};

export interface UserProfileDto {
  publicId: string;
  username: string;
  fullName: string | null;
  imageUrl: string | null;
  email: string | null;
  bio: string | null;
  headLine: string | null;
  locale: string | null;
  isAdmin: boolean;
  posts: PostPreviewDto[];
}