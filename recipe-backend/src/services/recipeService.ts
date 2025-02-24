import Recipe from "../models/recipeModel";

export const getAllRecipesService = async () => {
    try {
        const recipes = await Recipe.find();
        return recipes;
    } catch (error) {
        throw new Error("Failed to fetch recipes");
    }
};

export const getRecipeByIdService = async (id: string) => {
    try {
        const recipe = await Recipe.findById(id);
        return recipe;
    } catch (error) {
        throw new Error("Failed to fetch recipe byId");
    }
};

export const createRecipeService = async (recipeData: any) => {
    try {
        const recipe = await Recipe.create(recipeData);
        return recipe;
    } catch (error) {
        throw new Error("Failed to create recipe");
    }
};

export const updateRecipeService = async (id: string, recipeData: any) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(id, recipeData, { new: true });
        return recipe;
    } catch (error) {
        throw new Error("Failed to update recipe");
    }
};

export const deleteRecipeService = async (id: string) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(id);
        return recipe;
    } catch (error) {
        throw new Error("Failed to delete recipe");
    }
};

export const getRecipesByCategoryService = async (category: string) => {
    try {
        const recipes = await Recipe.find({ category });
        return recipes;
    } catch (error) {
        throw new Error("Failed to fetch recipes by category");
    }
};  