export interface Ingredient {
  id?: number;
  quantity: string;
  name: string;
  unit: string;
}

export interface Category {
  id: number;
  name?: string;
}

export interface IRecipe {
  id?: number;
  name: string;
  category: Category[];
  ingredients: Ingredient[];
  steps: string[];
  prepTime?: number;
  imageUrl?: string;
  authorId?: number;
}
export type NewRecipe = Omit<IRecipe, "_id">;