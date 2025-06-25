import React, { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { useGeneratedRecipesContext } from "../../../context/aiContext";

interface Props {
  onGenerateRecipe: (ingredients: string[], category: string[], freeText: string) => void;
}

const RecipeAiForm: React.FC<Props> = ({ onGenerateRecipe }) => {
  const {isLoading} = useGeneratedRecipesContext();

  const [ingredientInput, setIngredientInput] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  const [categoryInput, setCategoryInput] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  const [freeText, setFreeText] = useState<string>("");

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setIngredients((prev) => [...prev, ingredientInput.trim()]);
      setIngredientInput((prev) => [...prev,","]);
    }
  };

  const handleAddCategory = () => {
    if (categoryInput.trim()) {
      setCategories((prev) => [...prev, categoryInput.trim()]);
      setCategoryInput((prev) => [...prev,","]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateRecipe(ingredients, categories, freeText);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div>
          <label className="block text-sm font-medium mb-1">Ingredient</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Yellow cheese"
              className="border p-2 rounded w-full"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
            />
            <Button type="button" onClick={handleAddIngredient}>Add</Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Breakfast"
              className="border p-2 rounded w-full"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
            />
            <Button type="button" onClick={handleAddCategory}>Add</Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Free Text</label>
          <input
            type="text"
            placeholder="e.g. No oven required"
            className="border p-2 rounded w-full"
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Generating..." : "Generate Recipe"}
      </Button>
    </form>
  );
};

export default RecipeAiForm;
