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
  const { getRecipeByAi, generatedRecipe } =useGeneratedRecipesContext();
  const { addRecipe } = useRecipesContext();
  const [generatedRecipesHistory, setGeneratedRecipesHistory] = useState<IRecipe[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [freeText, setFreeText] = useState<string>("");
  const [generatedRecipeLocal, setGeneratedRecipeLocal] = useState<IRecipe| null>(null); 
  const [showFormAddRecipe, setShowFormAddRecipe] = useState<boolean>(false); 
  const displayedRecipe = generatedRecipeLocal || generatedRecipe;
  
  const handleSelectFromHistory = (recipe: IRecipe) => {
   if (displayedRecipe) {
    const alreadyInHistory = generatedRecipesHistory.some(
      (r) => r.name === displayedRecipe.name
    );

    if (!alreadyInHistory) {
      setGeneratedRecipesHistory((prev) => [...prev, displayedRecipe]);
    }
  }
    setGeneratedRecipeLocal(recipe);
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
      setGeneratedRecipeLocal(null);
    } finally {
      // Optional cleanup
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
      setShowFormAddRecipe(true);
    }
  };

  const handleDeleteFromHistory = (idxToDelete: number) => {
    setGeneratedRecipesHistory((prev) => prev.filter((_, idx) => idx !== idxToDelete));
    if (displayedRecipe === generatedRecipesHistory[idxToDelete]) {
      setGeneratedRecipeLocal(null);
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

      {showFormAddRecipe && displayedRecipe && (
        <Modal onClose={() => setShowFormAddRecipe(false)} isOpen={showFormAddRecipe} title="Add recipe">
        <RecipeForm
          initialRecipe={displayedRecipe}
          onSubmit={(recipe) => {
            addRecipe(recipe);
            setShowFormAddRecipe(false);  
          }}
          onCancel={() => setShowFormAddRecipe(false)}
        />
        </Modal>
      )}

      <AiRecipesHistory
        recipes={generatedRecipesHistory}
        onSelect={handleSelectFromHistory}
        onDelete={handleDeleteFromHistory}
      />
    </div>
  );
};
export default AiRecipeSection;
