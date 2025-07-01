import React from "react";
import type { IRecipe } from "../../../types/recipeType";
import { X } from "lucide-react";

type RecipeHistoryListProps = {
  recipes: IRecipe[];
  onSelect: (recipe: IRecipe) => void;
  onDelete: (index: number) => void;
};

const AiRecipesHistory: React.FC<RecipeHistoryListProps> = ({ recipes, onSelect, onDelete }) => {
  if (recipes.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Generated Recipes History</h2>
      <ul className="space-y-2">
        {recipes.map((rec, idx) => (
          <li
            key={idx}
            className="border p-2 rounded shadow-sm flex justify-between items-center"
          >
            <button
              className="text-left flex-1"
              onClick={() => onSelect(rec)}
            >
              {rec.name} - {rec.categories.join(", ")}
            </button>
           <button type="button" onClick={() => onDelete(idx)}>
              <X className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AiRecipesHistory;
