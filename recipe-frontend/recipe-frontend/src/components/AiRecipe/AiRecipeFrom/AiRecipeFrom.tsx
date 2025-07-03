import { Button } from "../../ui/Button";
import React, { useState } from "react";
import { useGeneratedRecipesContext } from "../../../context/aiContext";
import TagsInput from "../../ui/TagsInput";
import LabeledInput from "../../ui/LabeledInput";

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
    const finalIngredients = currentIngredient.trim()
      ? [...ingredients, currentIngredient.trim()]
      : ingredients;

    const finalCategories = currentCategory.trim()
      ? [...categories, currentCategory.trim()]
      : categories;
    e.preventDefault();

    onGenerateRecipe(finalIngredients, finalCategories, freeText);

    setIngredients([]);
    setCategories([]);
    setCurrentIngredient("");
    setCurrentCategory("");
    setFreeText("");
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
          <LabeledInput
            label="Free Text"
            placeholder="e.g. No oven required"
            value={freeText}
            onChange={setFreeText}
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
