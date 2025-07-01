import { GoogleGenerativeAI } from "@google/generative-ai";
import { IRecipe } from "../../../models/recipeModel";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || "");

export const geminiAgentGenerate = async (prompt: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const aiResponse: string = response.text();

    const jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)\s*```/i);
    console.log(jsonMatch)
    if (!jsonMatch) {
      throw new Error("Failed to extract JSON from Gemini response");
    }
    const jsonString = jsonMatch[1].trim();

    const recipe: IRecipe = JSON.parse(jsonString);

    return recipe;
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    throw new Error(
      "Failed to get recipe from Gemini: " + (error as Error).message
    );
  }
};
