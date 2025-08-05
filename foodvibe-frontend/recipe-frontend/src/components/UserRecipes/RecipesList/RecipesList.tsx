import type { IRecipe } from "../../../types/recipeType";
import { Card } from "../../ui/Card";
import { CardContent } from "../../ui/CardContent";

interface RecipesListProps {
  recipes: IRecipe[];
  onRecipeClick: (recipe: IRecipe) => void;
}

const RecipesList: React.FC<RecipesListProps> = ({recipes, onRecipeClick}) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {recipes.map((recipe) => (
        <li key={recipe.id} onClick={() => onRecipeClick(recipe)} className="cursor-pointer">
          <Card className="hover:shadow-lg transition duration-300">
            <CardContent>
              <h3 className="text-lg font-semibold text-gray-800">{recipe.name}</h3>
              <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                {recipe.categories.map((cat, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-2 py-1 rounded border text-xs font-medium"
                  >
                    <span className="text-gray-800">{cat.name}</span>
                    <span className="text-gray-500 italic ml-1">
                      ({cat.type})
                    </span>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
};


export default RecipesList;
