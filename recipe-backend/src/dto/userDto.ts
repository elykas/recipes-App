import { type } from "os";
import { IRecipe } from "../models/recipeModel";
export type UserDto = {
  id: number;
  username: string;
  email?: string | null;
  phone?: string | null;
  googleId?: string | null;
  isAdmin: boolean | null;
  imageUrl?: string | null;
  bio?: string | null;
  recipes?: IRecipe[];
};

export type UpdateUserDto = {
  id: number;
  username: string;
  imageUrl?: string | null;
  bio?: string | null;
}

export type UserIdentifier = { email: string } | { id: number };
