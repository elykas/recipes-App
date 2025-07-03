import React, { useState } from "react";
import { useGeneratedRecipesContext } from "../../../context/aiContext";
import { useRecipesContext } from "../../../context/recipesContext";
import type { IRecipe } from "../../../types/recipeType";
import RecipeAiCard from "../AiRecipeCard/AiRecipeCard";
import RecipeAiForm from "../AiRecipeFrom/AiRecipeFrom";
import AiRecipesHistory from "../AiRecipeHistory/AiRecipesHistory";
import RecipeForm from "../../UserRecipes/RecipeForm/RecipeForm";
import Modal from "../../ui/Modal";

const AiRecipeSection: React.FC = () => {
  const { getRecipeByAi, generatedRecipe } = useGeneratedRecipesContext();
  const { addRecipe } = useRecipesContext();
  const [generatedRecipesHistory, setGeneratedRecipesHistory] = useState<
    IRecipe[]
  >([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [freeText, setFreeText] = useState<string>("");
  const [selectedRecipeFromHistory, setSelectedRecipeFromHistory] =
    useState<IRecipe | null>(null);
  const [showFormToAddRecipe, setShowFormToAddRecipe] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const displayedRecipe = selectedRecipeFromHistory || generatedRecipe;

  const handleSelectRecipeFromHistory = (recipe: IRecipe) => {
    if (displayedRecipe) {
      const alreadyInHistory = generatedRecipesHistory.some(
        (r) => r.name === displayedRecipe.name
      );

      if (!alreadyInHistory) {
        setGeneratedRecipesHistory((prev) => [...prev, displayedRecipe]);
      }
    }
    setSelectedRecipeFromHistory(recipe);
  };

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
      setSelectedRecipeFromHistory(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handleGenerateAnother = async () => {
    if (generatedRecipe) {
      setGeneratedRecipesHistory((prev) => [...prev, generatedRecipe]);
      handleGenerateRecipe(ingredients, categories, freeText);
    }
  };

  const handleOpenAddRecipeForm = () => {
    if (displayedRecipe) {
      setShowFormToAddRecipe(true);
    }
  };

  const handleDeleteFromHistory = (idxToDelete: number) => {
    setGeneratedRecipesHistory((prev) =>
      prev.filter((_, idx) => idx !== idxToDelete)
    );
    if (displayedRecipe === generatedRecipesHistory[idxToDelete]) {
      setSelectedRecipeFromHistory(null);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">AI Recipe Generator</h1>

      <RecipeAiForm onGenerateRecipe={handleGenerateRecipe} />

      {displayedRecipe && (
        <RecipeAiCard
          recipe={displayedRecipe}
          onSave={handleOpenAddRecipeForm}
          onGenerateAnother={handleGenerateAnother}
        />
      )}

      {showFormToAddRecipe && displayedRecipe && (
        <Modal
          onClose={() => setShowFormToAddRecipe(false)}
          isOpen={showFormToAddRecipe}
          title="Add recipe"
        >
          <RecipeForm
            initialRecipe={displayedRecipe}
            onSubmit={(recipe) => {
              addRecipe(recipe);
              setShowFormToAddRecipe(false);
            }}
            onCancel={() => setShowFormToAddRecipe(false)}
          />
        </Modal>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <AiRecipesHistory
        recipes={generatedRecipesHistory}
        onSelect={handleSelectRecipeFromHistory}
        onDelete={handleDeleteFromHistory}
      />
    </div>
  );
};
export default AiRecipeSection;
