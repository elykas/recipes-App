import api from "../api/axiosRefreshToken"
import React, { createContext, useContext, useState } from "react";
import type { IRecipe } from "../types/recipeType";
import type { AiRecipeResponse } from "../types/responseTypes";


interface GeneratedRecipesProviderProps {
  children: React.ReactNode;
}

interface GeneratedRecipesContextProps {
  generatedRecipes: IRecipe[];
  generatedRecipe: IRecipe | null;
  isLoading: boolean;
  getRecipeByAi: (
    ingredients: string[],
    category: string[],
    freeText: string,
    previousRecipes: IRecipe[]
  ) => Promise<void>;
}

const GeneratedRecipesContext = createContext<GeneratedRecipesContextProps>({
  generatedRecipes: [],
  generatedRecipe: null,
  isLoading: false,
  getRecipeByAi: async () => {},
});

export const GeneratedRecipesProvider: React.FC<
  GeneratedRecipesProviderProps
> = ({ children }) => {
  const [generatedRecipes, setGeneratedRecipes] = useState<IRecipe[]>([]);
  const [generatedRecipe, setGeneratedRecipe] = useState<IRecipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getRecipeByAi = async (
    ingredients: string[],
    category: string[],
    freeText: string,
    previousRecipes: IRecipe[]
  ) => {
    setIsLoading(true);
    try {
      const response = await api.post(`/ai-recipes/generate-recipe`, {
        ingredients,
        category,
        freeText,
        previousRecipes,
      },{withCredentials:true});
      const data = response.data as AiRecipeResponse;
      const recipe = data.data;
      setGeneratedRecipe(recipe);
     
    } catch (error) {
      throw new Error("failed to get recipe by AI");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GeneratedRecipesContext.Provider
      value={{ generatedRecipes, generatedRecipe, isLoading, getRecipeByAi }}
    >
      {children}
    </GeneratedRecipesContext.Provider>
  );
};

export const useGeneratedRecipesContext = () => {
  const context = useContext(GeneratedRecipesContext);
  if (!context) {
    throw new Error(
      "useGeneratedRecipes must be used within a GeneratedRecipesProvider"
    );
  }
  return context;
};
export { GeneratedRecipesContext };
