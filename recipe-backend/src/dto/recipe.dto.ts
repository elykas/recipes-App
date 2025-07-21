import { DifficultyLevel } from "@prisma/client";
import {
  ICategory,
  IIngredient,
  IRecipeLikes,
  ISteps,
} from "../models/recipeModel";

export interface RecipeResponseDto {
  publicId: string;
  title: string;
  categories: ICategory[];
  ingredients: IIngredient[];
  difficulty: DifficultyLevel;
  isPublic: boolean;
  steps: ISteps[];
  prepTime?: number | null;
  imageUrl?: string | null;
  description?: string | null;
  tip?: string[] | null;
  likes?: IRecipeLikes[];
  authorPublicId: string;
  isFavorite: boolean;
}

export interface RecipeIdDto {
  publicId: string;
}

export type SearchRecipeDto = {
  publicId?: string;
  title?: string;
  isPublic?: boolean;
};

export type PreviewRecipeDto = {
  publicId: string;
  title: string;
  imageUrl: string | null;
  categories: ICategory[];
  isPublic: boolean;
  likes: number;
};
