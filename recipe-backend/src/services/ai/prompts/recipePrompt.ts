interface BuildRecipePromptParams {
  ingredients: string[];
  category?: string[];
  freeText?: string;
}

export const buildRecipePrompt = ({
  ingredients,
  category,
  freeText,
}: BuildRecipePromptParams): string => {
  let prompt = `Please generate a single recipe strictly in JSON format with the following structure:

{
  "name": "string",
  "category": ["string", "string", ...],
  "ingredients": [
    { "name": "string", "quantity": "string" }
  ],
  "steps": ["string", "string", ...],
  "prepTime": "string",
  "imageUrl": "string (optional)"
}

Use the following information to generate the recipe:\n`;

  if (ingredients.length > 0) {
    prompt += `Ingredients I have: ${ingredients.join(", ")}\n`;
  }

  if (category && category.length > 0) {
    prompt += `Desired categories: ${category.join(", ")}\n`;
  }

  if (freeText) {
    prompt += `Additional instructions: ${freeText}\n`;
  }

  prompt += `\nPlease respond with only valid JSON. Do not include explanations or extra text.`;

  return prompt;
};
