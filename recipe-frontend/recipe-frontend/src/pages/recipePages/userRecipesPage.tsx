import { useEffect, useState } from "react";
import RecipeCard from "../../components/UserRecipes/RecipeCard/RecipeCard";
import RecipesList from "../../components/UserRecipes/RecipesList/RecipesList";
import { useRecipesContext } from "../../context/recipesContext";
import type { IRecipe } from "../../types/recipeType";

const UserRecipesPage = () => {
  const { recipes, isLoading, getAllRecipes, deleteRecipe, updateRecipe } =
    useRecipesContext();
  const [selectedCard, setSelectedCard] = useState<IRecipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      if (!recipes) {
        try {
          await getAllRecipes();
        } catch (error) {
          setError("Failed to fetch recipes");
        }
      }
    };
    fetchUserRecipes();
  }, []);

  const handleDisplayRecipe = (recipe: IRecipe) => {
    setSelectedCard(recipe);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const handleNextRecipe = () => {
    const currentIndex = recipes.findIndex(
      (recipe) => recipe._id === selectedCard?._id
    );
    const nextIndex = (currentIndex + 1) % recipes.length;
    setSelectedCard(recipes[nextIndex]);
  };

  const handlePreviousRecipe = () => {
    const currentIndex = recipes.findIndex(
      (recipe) => recipe._id === selectedCard?._id
    );
    const previousIndex = (currentIndex - 1 + recipes.length) % recipes.length;
    setSelectedCard(recipes[previousIndex]);
  };

  const handleDeleteRecipe = async (recipeId: string) => {
    try {
      await deleteRecipe(recipeId);
    } catch (error) {
      setError("Failed to delete recipe");
    }
  };

  const handleUpdateRecipe = async (recipe: IRecipe) => {
    try {
      await updateRecipe(recipe);
    } catch (error) {
      setError("Failed to update recipe");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Recipes</h2>
      <RecipesList recipes={recipes} onRecipeClick={handleDisplayRecipe} />
      {isLoading && (
        <div className="flex justify-center items-center my-4">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {recipes && selectedCard !== null && (
        <RecipeCard
          recipe={selectedCard}
          onClose={handleCloseModal}
          onNext={handleNextRecipe}
          onPrev={handlePreviousRecipe}
          onDelete={handleDeleteRecipe}
          onEdit={handleUpdateRecipe}
        />
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
export default UserRecipesPage;
