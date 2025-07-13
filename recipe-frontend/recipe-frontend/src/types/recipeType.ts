import type { ICategory } from "./categoryType";

export interface Ingredient {
  id?: number;
  quantity: string;
  name: string;
  unit: string;
}



export interface IRecipe {
  id: number;
  name: string;
  categories: ICategory[];
  ingredients: Ingredient[];
  steps: string[];
  prepTime?: number;
  imageUrl?: string;
  authorId?: number;
}
export type NewRecipe = Omit<IRecipe, "id">;