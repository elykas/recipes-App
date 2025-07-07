export interface IngredientDTO {
  id: number;
  name: string;
  quantity?: string | null;
  unit?: string | null;
}

export interface CategoryDTO {
  id: number;
  name: string;
}

export interface RecipeResponseDTO {
  id: number;
  name: string;
  categories: CategoryDTO[];
  steps: string[];
  prepTime?: number | null;
  imageUrl?: string | null;
  authorId: number;
  ingredients: IngredientDTO[];
}
