import { IPostLike } from "../models/postModel";
import IRecipe from "../models/recipeModel";
import IUser from "../models/userModel";

export interface PostInputCreateDto {
  content?: string | null;
  recipePublicId?: string | null;
}

export interface PostInputUpdateDto {
  content: string | null;
  recipePublicId: string | null;
}

interface BasicPostDto {
  publicId: string;
}

export interface CreatePostResponseDto extends BasicPostDto {}

export interface UpdatePostResponseDto extends BasicPostDto {}

export interface UpdateImagePostDto extends BasicPostDto {}

export interface DeletedPostDto extends BasicPostDto {}

export interface PostLikeResponseDto extends BasicPostDto {}

export interface FullPostDto {
  publicId: string;
  content: string | null;
  imageUrl: string | null;
  recipe: {
    publicId: string;
    title: string;
  } | null;
  user: {
    publicId: string;
    username: string;
  };
  likes: number;
}