import { IGroup, IGroupMember } from "./groupModel";
import { IPost, IPostLike } from "./postModel";
import { IFavoriteRecipes, IRecipe, IRecipeLikes } from "./recipeModel";

export interface IUser {
  id?: number;
  publicId: string;
  email: string;
  username: string;
  fullName?: string;
  phone?: string;
  imageUrl?: string | null;
  bio?: string;
  headLine?: string;
  birthDate?: Date;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  agreedToPolicy?: boolean;
  agreedToPolicyDate?: Date;
  agreedToPolicyVersion?: string;
  locale?: string;
  recipes?: IRecipe[];
  posts?: IPost[];
  postLikes?: IPostLike[];
  recipeLikes?: IRecipeLikes[];
  favoritesRecipes?: IFavoriteRecipes[];
  userGroups?: IGroupMember[];
  createdGroups?: IGroup[];
  userEvents?: IUserEvents[];
  feedback?: IFeedback[];
}

export interface IUserEvents {
  id?: number;
  userId: number;
  user: IUser;
  type: string;
  data: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum EvevntType {
  Login = "Login",
  Logout = "Logout",
  ViewRecipe = "ViewRecipe",
  ViewPost = "ViewPost",
  CreateRecipe = "CreateRecipe",
  CreatePost = "CreatePost",
  Like = "Like",
  Comment = "Comment",
  Follow = "Follow",
  Unfollow = "Unfollow",
  UpadateProfile = "UpadateProfile",
  Search = "Search",
  Share = "Share",
  ClickNotification = "ClickNotification",
}

export interface IFeedback {
  id?: number | null;
  userId: number;
  user?: IUser | null;
  content: string;
  createdAt?: Date;
}

export default IUser;
