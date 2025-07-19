import { CategoryType, DifficultyLevel } from "@prisma/client";
import IUser from "./userModel";
export interface IIngredient {
  id?: number;
  name: string;
  quantity?: string | null;
  unit?: string | null;
  recipeId: number;
}

export interface ICategory {
  id: number;
  name: string;
  type: CategoryType;
}

export interface IRecipe {
  id?: number;
  publicId: string;
  title: string;
  categories: ICategory[];
  ingredients: IIngredient[];
  steps: ISteps[];
  difficulty: DifficultyLevel;
  isPublic: boolean;
  prepTime?: number | null;
  imageUrl?: string | null;
  description?: string | null;
  tip?: string[];
  favoriteRecipe:IFavoriteRecipes[]
  likes?: IRecipeLikes[];
  author ?: IUser
  authorId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRecipeLikes {
  recipeId: number;
  userId: number;
}



export interface ISteps {
  id: number;
  title?: string | null;
  description: string;
  imageUrl?: string | null; 
  duration?: number | null;
  order: number;
}

export interface IFavoriteRecipes {
  id?: number;
  recipeId: number;
  userId: number;
}

export default IRecipe;
