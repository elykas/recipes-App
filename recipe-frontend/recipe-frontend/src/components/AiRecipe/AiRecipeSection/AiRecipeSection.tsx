import React, { useState } from "react";
import { useGeneratedRecipesContext } from "../../../context/aiContext";
import type { IRecipe } from "../../../types/recipeType";
import { Button } from "../../ui/button";
import { Plus, RefreshCcw, Save } from "lucide-react";
import { useRecipesContext } from "../../../context/recipesContext";
import RecipeAiForm from "../AiRecipeFrom/AiRecipeFrom";
import RecipeAiCard from "../AiRecipeCard/AiRecipeCard";

const AiRecipeComponent: React.FC = () => {
  const { getRecipeByAi, generatedRecipe, isLoading } =
    useGeneratedRecipesContext();
  const { addRecipe } = useRecipesContext();

  const [generatedRecipesHistory, setGeneratedRecipesHistory] = useState<
    IRecipe[]
  >([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [freeText, setFreeText] = useState<string>("");

  const handleGenerateRecipe = async (
    newIngredients: string[],
    newCategories: string[],
    newFreeText: string
  ) => {
    setIngredients(newIngredients);
    setCategories(newCategories);
    setFreeText(newFreeText);

    try {
      await getRecipeByAi(
        newIngredients,
        newCategories,
        newFreeText,
        generatedRecipesHistory
      );
    } finally {
      // Optional cleanup
    }
  };

  const handleGenerateAnother = async () => {
    if (generatedRecipe) {
      setGeneratedRecipesHistory((prev) => [...prev, generatedRecipe]);
      handleGenerateRecipe(
        ingredients,
        categories,
        freeText
      );
    }
  };

  const handleSaveRecipe = () => {
    if (generatedRecipe) {
      addRecipe(generatedRecipe);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">AI Recipe Generator</h1>

      <RecipeAiForm onGenerateRecipe={handleGenerateRecipe} />

      {generatedRecipe && (
        <RecipeAiCard
          recipe={generatedRecipe}
          onSave={handleSaveRecipe}
          onGenerateAnother={handleGenerateAnother}
        />
      )}

      {generatedRecipesHistory.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">
            Generated Recipes History
          </h2>
          <ul className="space-y-2">
            {generatedRecipesHistory.map((rec, idx) => (
              <li key={idx} className="border p-2 rounded shadow-sm">
                {rec.name} - {rec.category.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default AiRecipeComponent;
