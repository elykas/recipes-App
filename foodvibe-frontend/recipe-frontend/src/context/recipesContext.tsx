import api from "../api/axiosRefreshToken"
import React, { createContext, useContext, useState } from "react";
import type { IRecipe, NewRecipe } from "../types/recipeType";
import type { RecipeListResponse, SingleRecipeResponse } from "../types/responseTypes";


interface RecipesProviderProps {
  children: React.ReactNode;
}
interface RecipesContextProps {
  recipes: IRecipe[];
  recipe: IRecipe | null;
  isLoading: boolean;
  getAllRecipes: () => Promise<void>;
  getRecipe: (recipeId: number) => Promise<void>;
  addRecipe: (newRecipe: NewRecipe) => Promise<void>;
  deleteRecipe: (recipeId: number) => Promise<void>;
  updateRecipe: (recipe: IRecipe, recipeId: number) => Promise<void>;
  getRecipesByCategory: (category: string) => Promise<void>;
}

const RecipesContext = createContext<RecipesContextProps>({
  recipes: [],
  recipe: null,
  isLoading: false,
  getAllRecipes: async () => {},
  getRecipe: async () => {},
  addRecipe: async () => {},
  deleteRecipe: async () => {},
  updateRecipe: async () => {},
  getRecipesByCategory: async () => {},
});

export const RecipesProvider: React.FC<RecipesProviderProps> = ({
  children,
}) => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllRecipes = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/recipes`);
      const data = response.data as RecipeListResponse;
      const recipes: IRecipe[] = data.data;
      setRecipes(recipes);
    } catch (error) {
      throw new Error("failed to get recipes");
    } finally {
      setIsLoading(false);
    }
  };

  const getRecipe = async (recipeId: number) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/recipes/get-recipe/${recipeId}`);
      const data:SingleRecipeResponse = response.data as SingleRecipeResponse;
      const recipe: IRecipe = data.data;
      setRecipe(recipe);
    } catch (error) {
      throw new Error("failed to get recipe");
    } finally {
      setIsLoading(false);
    }
  };

  const addRecipe = async (newRecipe: NewRecipe) => {
    setIsLoading(true);
    try {
      await api.post(`/recipes`, newRecipe);
    } catch (error) {
      throw new Error("failed to add recipe");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRecipe = async (recipeId: number) => {
    setIsLoading(true);
    try {
      await api.delete(`/recipes/${recipeId}`);
    } catch (error) {
      throw new Error("failed to delete recipe");
    } finally {
      setIsLoading(false);
    }
  };

  const updateRecipe = async (recipe: IRecipe, recipeId: number) => {
    setIsLoading(true);
    try {
      await api.put(`/recipes/${recipeId}`, recipe);
    } catch (error) {
      throw new Error("failed to update recipe");
    } finally {
      setIsLoading(false);
    }
  };

  const getRecipesByCategory = async (category: string) => {
    try {
      const response = await api.get(`/recipes/get-by-category/${category}`);
      const data = response.data as RecipeListResponse;
      const recipes: IRecipe[] = data.data;
      setRecipes(recipes);
    } catch (error) {
      throw new Error("failed to get recipes by category");
    }
  };



  return (
    <RecipesContext.Provider
      value={{
        recipes,
        recipe,
        isLoading,
        getAllRecipes,
        getRecipe,
        addRecipe,
        deleteRecipe,
        updateRecipe,
        getRecipesByCategory,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipesContext = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error("useUser must be used within a RecipesProvider");
  }
  return context;
};
export { RecipesContext };
