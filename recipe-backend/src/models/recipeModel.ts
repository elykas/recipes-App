import { CategoryType } from "@prisma/client";
export interface Ingredient {
  id?: number;
  name: string;
  quantity?: string | null;
  unit?: string | null;
}

export interface ICategory {
  id: number;
  name: string;
  type: CategoryType;
}

export interface IRecipe {
  id?: number;
  name: string;
  categories: ICategory[];
  ingredients: Ingredient[];
  steps: string[];
  prepTime?: number | null;
  imageUrl?: string | null;
  authorId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default IRecipe;
