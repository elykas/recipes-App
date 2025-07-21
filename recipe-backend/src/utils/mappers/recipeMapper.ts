import {
  PreviewRecipeDto,
  RecipeResponseDto,
  SearchRecipeDto,
} from "../../dto/recipe.dto";
import {
  FullRecipeResponse,
  PreviewRecipesResponse,
  SearchRecipeResponse,
} from "../../types/responses";

export const mapFullRecipeToDTO = (
  recipe: FullRecipeResponse
): RecipeResponseDto => ({
  publicId: recipe.publicId,
  title: recipe.title,
  difficulty: recipe.difficulty,
  isPublic: recipe.isPublic,
  tip: recipe.tip,
  prepTime: recipe.prepTime,
  imageUrl: recipe.imageUrl,
  description: recipe.description,
  authorPublicId: recipe.author.publicId,
  categories: recipe.categories.map((c) => ({
    id: c.id,
    name: c.name,
    type: c.type,
  })),
  steps: recipe.steps.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    duration: s.duration,
    order: s.order,
  })),
  ingredients: recipe.ingredients.map((ing) => ({
    id: ing.id,
    name: ing.name,
    quantity: ing.quantity,
    unit: ing.unit,
  })),
  likes: recipe.likes.map((l) => ({
    id: l.id,
    type: l.type,
  })),
  isFavorite: !!recipe.favoriteRecipe?.length,
});

export const mapSearchRecipeToDto = (
  recipe: SearchRecipeResponse
): SearchRecipeDto => ({
  publicId: recipe.publicId,
  title: recipe.title,
  isPublic: recipe.isPublic,
});

export const mapPreviewRecipeToDto = (
  recipe: PreviewRecipesResponse
): PreviewRecipeDto => ({
  title: recipe.title,
  publicId: recipe.publicId,
  imageUrl: recipe.imageUrl,
  categories: recipe.categories.map((c) => ({
    id: c.id,
    name: c.name,
    type: c.type,
  })),
  isPublic: recipe.isPublic,
  likes: recipe._count?.likes ?? 0,
});
