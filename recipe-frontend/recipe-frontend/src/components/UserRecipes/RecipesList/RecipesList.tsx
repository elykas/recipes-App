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
        <li key={recipe._id} onClick={() => onRecipeClick(recipe)} className="cursor-pointer">
          <Card className="hover:shadow-lg transition duration-300">
            <CardContent>
              <h3 className="text-lg font-semibold text-gray-800">{recipe.name}</h3>
              <h4 className="text-lg font-semibold text-gray-800">{recipe.categories[0]}</h4>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
};


export default RecipesList;
