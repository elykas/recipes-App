export interface IRecipe{
    _id: string;
    name: string;
    category: string[];
    ingredients: string[];
    steps: string[];
    prepTime: string;
    imageUrl?: string;
}