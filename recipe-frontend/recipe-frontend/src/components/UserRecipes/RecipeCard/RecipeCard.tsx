import type React from "react";
import type { IRecipe } from "../../../types/recipeType";

interface RecipeCardProps {
  recipe: IRecipe;
  onDelete: (recipeId: string) => void;
  onEdit: (recipe: IRecipe) => void;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onDelete,
  onEdit,
  onClose,
  onNext,
  onPrev,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl max-w-md w-full relative shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">{recipe.name}</h2>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">מצרכים:</h3>
          <ul className="list-disc list-inside space-y-1">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.quantity} {ingredient.unit} - {ingredient.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">שלבי הכנה:</h3>
          <ol className="list-decimal list-inside space-y-1">
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="flex justify-between mb-4">
          <button
            onClick={onPrev}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← הקודם
          </button>
          <button
            onClick={onNext}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            הבא →
          </button>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => onEdit(recipe)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            ערוך
          </button>
          <button
            onClick={() => onDelete(recipe._id)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            מחק
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
