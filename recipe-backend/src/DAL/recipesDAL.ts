import Recipe, { IRecipe } from "../models/recipeModel";

export const getAllRecipesMongo = async () => {
    try {
        const recipes = await Recipe.find();
        return recipes;
    } catch (error) {
        throw new Error("Failed to fetch recipes");
    }   
}

export const getRecipeByIdMongo = async (id: string) => {
    try {
        const recipe = await Recipe.findById(id);
        return recipe;
    } catch (error) {
        throw new Error("Failed to fetch recipe byId");
    }   
}

export const createRecipeMongo = async (recipeData: IRecipe) => {
    try {
        const newRecipe = await Recipe.create(recipeData);
        return newRecipe;
    } catch (error) {
        throw new Error("Failed to create recipe");
    }   
}

export const updateRecipeMongo = async (id: string, recipeData: IRecipe) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(id, recipeData, { new: true });
        return recipe;
    } catch (error) {
        throw new Error("Failed to update recipe");
    }   
}

export const deleteRecipeMongo = async (id: string) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(id);
        return recipe;
    } catch (error) {
        throw new Error("Failed to delete recipe");
    }   
}

export const getRecipesByCategoryMongo = async (category: string) => {
    try {
        const recipes = await Recipe.find({ category });
        return recipes;
    } catch (error) {
        throw new Error("Failed to fetch recipes by category");
    }   
}

