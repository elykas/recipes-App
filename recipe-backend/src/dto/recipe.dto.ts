import IRecipe, { DifficultyLevel, ICategory, IIngredient, IRecipeLikes, ISteps } from "../models/recipeModel";



export interface RecipeResponseDTO {
  publicId: number;
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
  authorId: number;
}

export interface CreateRecipeDTO {
  title: string;
  categories: ICategory[];
  steps: ISteps[];
  ingredients: IIngredient[];
  difficulty?: DifficultyLevel;
  isPublic?: boolean;
  prepTime?: number | null;
  imageUrl?: string | null;
  description?: string | null;
  tip?: string[] | null;
  authorId: number;
}
