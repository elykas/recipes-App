export interface Ingredient {
  quantity: string;
  name: string;
  unit: string;
}

export interface IRecipe {
  id?: number;
  name: string;
  category: string[];
  ingredients: Ingredient[];
  steps: string[];
  prepTime?: number;
  imageUrl?: string;
  authorId?: number;
}
export type NewRecipe = Omit<IRecipe, "_id">;