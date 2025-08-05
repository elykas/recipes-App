import axios from "axios";
import { IRecipe } from "../../../models/recipeModel";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;

export const openAiAgentGenerateRecipe = async (prompt: string) => {
  try {
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
    const recipe: IRecipe = JSON.parse(aiResponse);
    return recipe;
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    throw new Error("failed to get recipe from openAi" + error);
  }
};
