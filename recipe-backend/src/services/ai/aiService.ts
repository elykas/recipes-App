import axios from "axios";
import Recipe, { IRecipe } from "../../models/recipeModel";
import { buildRecipePrompt } from "./prompts/recipePrompt";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const getRecipeAIService = async (
  ingredients: string[],
  category: string[],
  freeText: string
) => {
  let prompt = buildRecipePrompt({ ingredients, category, freeText });
  
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const aiResponse: string = response.data.choices[0].message.content;
  try {
    const recipe: IRecipe = JSON.parse(aiResponse);
    return recipe;
  } catch (error) {
    throw new Error("failed to get recipe from ai");
  }
};
