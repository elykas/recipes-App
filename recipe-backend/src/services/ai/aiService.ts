import Recipe, { IRecipe } from "../../models/recipeModel";
import { buildRecipePrompt } from "./prompts/recipePrompt";
import {geminiAgentGenerate} from "./agents/geminiAgent"


export const getRecipeAIService = async (
  ingredients: string[],
  category: string[],
  freeText: string,
  previousRecipes: IRecipe[]
) => {
  let prompt = buildRecipePrompt(ingredients, category, freeText, previousRecipes);
  try {
    const generatedRecipe = await geminiAgentGenerate(prompt)
    return generatedRecipe
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    throw new Error("failed to generate recipe" + error)
  }
};
