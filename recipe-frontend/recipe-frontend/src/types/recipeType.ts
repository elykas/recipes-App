export interface Ingredient {
  quantity: string;
  name: string;
  unit: string;
}

export interface IRecipe {
  name: string;
  categories: string[];
  ingredients: Ingredient[];
  steps: string[];
}
