import { Button } from "../../ui/button";
import React, { useState } from "react";
import { useGeneratedRecipesContext } from "../../../context/aiContext";
import TagsInput from "../TagsInput/TagsInput";

interface Props {
  onGenerateRecipe: (
    ingredients: string[],
    category: string[],
    freeText: string
  ) => void;
}

const RecipeAiForm: React.FC<Props> = ({ onGenerateRecipe }) => {
  const { isLoading } = useGeneratedRecipesContext();

  const [ingredients, setIngredients] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [freeText, setFreeText] = useState<string>("");

  const [currentIngredient, setCurrentIngredient] = useState<string>("");
  const [currentCategory, setCurrentCategory] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    console.log(ingredients)
    const finalIngredients = currentIngredient.trim()
      ? [...ingredients, currentIngredient.trim()]
      : ingredients;

    const finalCategories = currentCategory.trim()
      ? [...categories, currentCategory.trim()]
      : categories;
    e.preventDefault();

    onGenerateRecipe(finalIngredients, finalCategories, freeText);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TagsInput
          label="Ingredients"
          placeholder="e.g. Yellow cheese"
          tags={ingredients}
          setTags={setIngredients}
          currentInput={currentIngredient}
          setCurrentInput={setCurrentIngredient}
        />

        <TagsInput
          label="Categories"
          placeholder="e.g. Breakfast"
          tags={categories}
          setTags={setCategories}
          currentInput={currentCategory}
          setCurrentInput={setCurrentCategory}
        />

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
