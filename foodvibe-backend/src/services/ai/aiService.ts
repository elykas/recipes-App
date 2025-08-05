import Recipe, { IRecipe } from "../../models/recipeModel";
import { buildRecipePrompt } from "./prompts/recipePrompt";
import {geminiAgentGenerate} from "./agents/geminiAgent"


export const getRecipeAIService = async (
  ingredients: string[],
  category: string[],
  freeText: string,
  previousRecipes: IRecipe[]
): Promise<IRecipe> => {
  let prompt = buildRecipePrompt(ingredients, category, freeText, previousRecipes);
    const generatedRecipe: IRecipe = await geminiAgentGenerate(prompt)
    return generatedRecipe
  
};
