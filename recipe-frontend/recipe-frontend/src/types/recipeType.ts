export interface Ingredient {
  quantity: string;
  name: string;
  unit: string;
}

export interface IRecipe {
  _id: string;
  name: string;
  categories: string[];
  ingredients: Ingredient[];
  steps: string[];
}

export type NewRecipe = Omit<IRecipe, "_id">;