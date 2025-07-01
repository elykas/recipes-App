import { RefreshCcw, Save } from "lucide-react";
import React from "react";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/Card";
import { CardContent } from "../../../components/ui/CardContent";
import type { IRecipe } from "../../../types/recipeType";

type RecipeCardProps = {
  recipe: IRecipe;
  onSave: () => void;
  onGenerateAnother: () => void;
};

const RecipeAiCard: React.FC<RecipeCardProps> = ({
  recipe,
  onSave,
  onGenerateAnother,
}) => {
  return (
    <Card className="relative p-4 mt-4 shadow-lg">
      <div className="absolute top-2 right-2 flex space-x-2">
        <Button size="icon" variant="outline" onClick={onSave}>
          <Save className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="outline" onClick={onGenerateAnother}>
          <RefreshCcw className="w-4 h-4" />
        </Button>
      </div>
      <CardContent>
        <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
        <p className="mb-2">Categories: {recipe.categories.join(", ")}</p>
        <h3 className="font-medium">Ingredients:</h3>
        <ul className="list-disc list-inside mb-2">
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx}>
              {ing.quantity} {ing.name} {ing.unit}
            </li>
          ))}
        </ul>
        <h3 className="font-medium">Steps:</h3>
        <ol className="list-decimal list-inside">
          {recipe.steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};

export default RecipeAiCard;
