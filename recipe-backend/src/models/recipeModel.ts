interface Ingredient {
  id?: number;
  name: string;
  quantity?: string;
  unit?:string
}

interface Category {
  id?: number;
  name: string;
}

export interface IRecipe {
  id?: number;
  name: string;
  categories: Category[];
  ingredients: Ingredient[];
  steps: string[];
  prepTime?: number;
  imageUrl?: string;
  authorId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default IRecipe