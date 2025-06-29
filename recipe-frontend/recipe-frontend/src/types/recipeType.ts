export interface Ingredient {
  quantity: string;
  name: string;
}

export interface IRecipe {
  name: string;
  category: string[];
  ingredients: Ingredient[];
  steps: string[];
}
