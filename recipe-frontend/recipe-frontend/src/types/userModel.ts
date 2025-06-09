export interface IUser{
    _id: string;
    username: string;
    email: string;
    googleId: string;
    favoriteRecipes?: IRecipe[]
}

export interface IRecipe{

}