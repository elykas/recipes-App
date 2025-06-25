import { IRecipe } from "../../../models/recipeModel";

interface BuildRecipePromptParams {
  ingredients: string[];
  category?: string[];
  freeText?: string;
  previousRecipes?: IRecipe[];
}

export const buildRecipePrompt = (
  ingredients: string[],
  category: string[],
  freeText: string,
  previousRecipes: IRecipe[]
) => {
  let prompt = `Generate a recipe in JSON format with the following details:\n`;

  if (ingredients.length) prompt += `Ingredients: ${ingredients.join(", ")}\n`;
  if (category.length) prompt += `Categories: ${category.join(", ")}\n`;
  if (freeText) prompt += `Additional instructions: ${freeText}\n`;

  if (previousRecipes.length > 0) {
    prompt += `\nAvoid recipes similar to the following:\n`;
    previousRecipes.forEach((recipe, idx) => {
      prompt += `Recipe ${idx + 1} name: ${recipe.name}\nIngredients: ${recipe.ingredients.map(i => i.name).join(", ")}\n`;
    });
  }

  prompt += `\nRespond with only valid JSON without extra text.`;

  return prompt;
};
