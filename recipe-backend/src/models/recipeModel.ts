export interface Ingredient {
  id?: number;
  name: string;
  quantity?: string | null;
  unit?:string | null;
}

export interface Category {
  id?: number;
  name: string;
}

export interface IRecipe {
  id?: number;
  name: string;
  categories: Category[];
  ingredients: Ingredient[];
  steps: string[];
  prepTime?: number | null;
  imageUrl?: string | null;
  authorId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default IRecipe