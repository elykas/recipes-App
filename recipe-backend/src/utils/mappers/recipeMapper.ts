import { RecipeResponseDTO } from "../../dto/recipe.dto";
import { FullRecipe } from "../../types/responses";

export const mapRecipeToDTO = (recipe: FullRecipe): RecipeResponseDTO => ({
  id: recipe.id,
  name: recipe.name,
  categories: recipe.categories.map((c) => c.name),
  steps: recipe.steps,
  prepTime: recipe.prepTime,
  imageUrl: recipe.imageUrl,
  authorId: recipe.authorId!,
  ingredients: recipe.ingredients.map((ing) => ({
    id: ing.id,
    name: ing.name,
    quantity: ing.quantity,
    unit: ing.unit,
  })),
});
