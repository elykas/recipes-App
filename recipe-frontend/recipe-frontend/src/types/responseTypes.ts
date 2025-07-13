import type { ICategory } from "./categoryType";
import type { IRecipe } from "./recipeType";
import type { IUser } from "./userType";

export interface LoginResponse {
  success: boolean;
  message: string;
}

export type VerifyTokenResponse = {
  success: boolean;
  exist: boolean;
};

export type GetUser = {
  success: boolean;
  message: string;
  user: IUser;
};

export type AiRecipeResponse = {
  success: boolean;
  message: string;
  data: IRecipe;
};

export type SingleRecipeResponse = {
  success: boolean;
  message: string;
  data: IRecipe;
};

export type RecipeListResponse = {
  success: boolean;
  message: string;
  data: IRecipe[];
};

export type CategoryListResponse = {
  success: boolean;
  message: string;
  data: ICategory[];
};