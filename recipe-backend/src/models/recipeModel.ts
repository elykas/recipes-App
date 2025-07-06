import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import validator from 'validator';

interface Ingredient {
  name: string;
  quantity?: string;
  unit?:string
}

export interface IRecipe extends Document {
  id: string;
  name: string;
  category: string[];
  ingredients: Ingredient[];
  steps: string[];
  prepTime?: Number;
  imageUrl?: string;
  authorId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default IRecipe