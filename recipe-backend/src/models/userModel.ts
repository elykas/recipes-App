import { IRecipe } from "./recipeModel";

export interface IUser  {
  id: number;
  username: string;
  email?: string;
  phone?: string;
  googleId?: string;
  isAdmin?: boolean;
  imageUrl?: string;
  bio?: string;
  recipes?: IRecipe[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default IUser