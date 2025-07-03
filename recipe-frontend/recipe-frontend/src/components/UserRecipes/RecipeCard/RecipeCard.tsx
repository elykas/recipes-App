import type React from "react";
import type { IRecipe } from "../../../types/recipeType";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { CardContent } from "../../ui/CardContent";

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
      <Card className="p-6 max-w-md w-full relative shadow-lg">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-center">{recipe.name}</h2>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">ingredients:</h3>
            <ul className="list-disc list-inside space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.quantity} {ingredient.unit} - {ingredient.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">steps to prepare:</h3>
            <ol className="list-decimal list-inside space-y-1">
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="flex justify-between mb-4">
            <Button onClick={onPrev} variant="secondary">
              ← previous
            </Button>
            <Button onClick={onNext} variant="secondary">
              next →
            </Button>
          </div>

          <div className="flex justify-between">
            <Button onClick={() => onEdit(recipe)} variant="primary">
              edit
            </Button>
            <Button onClick={() => onDelete(recipe._id)} variant="destructive">
              delete
            </Button>
          </div>
        </CardContent>

        <Button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✖
        </Button>
      </Card>
    </div>
  );
};

export default RecipeCard;
