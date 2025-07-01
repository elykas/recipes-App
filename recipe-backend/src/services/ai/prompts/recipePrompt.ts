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
): string => {
  let prompt = `Generate a recipe in JSON format with the following details:\n`;

  if (ingredients.length) prompt += `Ingredients: ${ingredients.join(", ")}\n`;
  if (category.length) prompt += `Categories: ${category.join(", ")}\n`;
  if (freeText) prompt += `Additional instructions: ${freeText}\n`;

  if (previousRecipes.length > 0) {
    prompt += `\nAvoid recipes similar to the following:\n`;
    previousRecipes.forEach((recipe, idx) => {
      prompt += `Recipe ${idx + 1} name: ${recipe.name}\nIngredients: ${recipe.ingredients.map((i) => i.name).join(", ")}\n`;
    });
    prompt += `\n**IMPORTANT:** Ensure the generated recipe is **absolutely unique and significantly different** from the previous recipes provided below. `;
  prompt += `The "name" of the new recipe must be **creative, descriptive, and distinct**, not just a generic name, and should not duplicate any previous recipe names.\n`;
  prompt += `Strive for **variety** in ingredients or preparation methods if possible, given the constraints.\n`;
  }

  prompt += `\nRespond with only valid JSON without extra text.
    Use the key "steps" for the recipe instructions instead of "instructions".`;
  prompt += ` Each ingredient should be an object with the keys "quantity", "unit", and "name" 
 representing the amount, unit, and ingredient name respectively.\n`;

  return prompt;
// let prompt = `Generate a recipe in JSON format strictly adhering to the following rules and structure:\n`;

//   // General Recipe Requirements
//   if (ingredients.length) prompt += `Ingredients to include: ${ingredients.join(", ")}\n`;
//   if (category.length) prompt += `Categories for the recipe: ${category.join(", ")}\n`;
//   if (freeText) prompt += `Additional specific instructions for recipe creation: ${freeText}\n`;

//   // --- Start of improvements for uniqueness and clarity ---

//   // Uniqueness and Name Creativity
//   prompt += `\n**IMPORTANT:** Ensure the generated recipe is **absolutely unique and significantly different** from the previous recipes provided below. `;
//   prompt += `The "name" of the new recipe must be **creative, descriptive, and distinct**, not just a generic name, and should not duplicate any previous recipe names.\n`;
//   prompt += `Strive for **variety** in ingredients or preparation methods if possible, given the constraints.\n`;

//   // Instructions for avoiding similar recipes
//   if (previousRecipes && previousRecipes.length > 0) {
//     prompt += `\n**AVOID creating recipes similar to these previously generated ones:**\n`;
//     previousRecipes.forEach((recipe, idx) => {
//       prompt += `Recipe ${idx + 1}:\n`;
//       prompt += `- Name: "${recipe.name}"\n`;
//       prompt += `- Key Ingredients: ${recipe.ingredients.map((i) => i.name).join(", ")}\n`;
//     });
//   }

//   /

//   return prompt;
};
