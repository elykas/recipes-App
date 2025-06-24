import type { IRecipe } from "./recipeType";

export interface IUser{
    _id: string;
    username: string;
    email: string;
    googleId: string;
    favoriteRecipes?: IRecipe[]
}

