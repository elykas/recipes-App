import type { IRecipe } from "../../../types/recipeType";

interface RecipesListProps {
  recipes: IRecipe[];
  onRecipeClick: (recipe: IRecipe) => void;
}

const RecipesList: React.FC<RecipesListProps> = ({ recipes, onRecipeClick}) => {
 return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {recipes.map((recipe) => (
        <li
          key={recipe._id}
          onClick={() => onRecipeClick(recipe)}
          className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition duration-300 cursor-pointer">
          <h3 className="text-lg font-semibold text-gray-800">{recipe.name}</h3>
        </li>
      ))}
    </ul>
  );
};

export default RecipesList;
