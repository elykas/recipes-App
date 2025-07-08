import api from "../api/axiosRefreshToken"
import React, { createContext, useContext, useState } from "react";
import type { IRecipe, NewRecipe } from "../types/recipeType";


interface RecipesProviderProps {
  children: React.ReactNode;
}
interface RecipesContextProps {
  recipes: IRecipe[];
  recipe: IRecipe | null;
  isLoading: boolean;
  getAllRecipes: () => Promise<void>;
  getRecipe: (recipeId: string) => Promise<void>;
  addRecipe: (newRecipe: NewRecipe) => Promise<void>;
  deleteRecipe: (recipeId: string) => Promise<void>;
  updateRecipe: (recipe: IRecipe) => Promise<void>;
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
      const data = response.data as IRecipe[];
      setRecipes(data);
    } catch (error) {
      throw new Error("failed to get recipes");
    } finally {
      setIsLoading(false);
    }
  };

  const getRecipe = async (recipeId: string) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/recipes/get-recipe/${recipeId}`);
      const data = response.data as IRecipe;
      setRecipe(data);
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

  const deleteRecipe = async (recipeId: string) => {
    setIsLoading(true);
    try {
      await api.delete(`/recipes/${recipeId}`);
    } catch (error) {
      throw new Error("failed to delete recipe");
    } finally {
      setIsLoading(false);
    }
  };

  const updateRecipe = async (recipe: IRecipe) => {
    setIsLoading(true);
    try {
      await api.put(`/recipes`, recipe);
    } catch (error) {
      throw new Error("failed to update recipe");
    } finally {
      setIsLoading(false);
    }
  };

  const getRecipesByCategory = async (category: string) => {
    try {
      const response = await api.get(`/recipes/get-by-category/${category}`);
      const data = response.data as IRecipe[];
      setRecipes(data);
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
