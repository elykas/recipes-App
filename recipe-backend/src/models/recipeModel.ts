import mongoose, { Schema, Document, Model } from 'mongoose';

interface Ingredient {
  name: string;
  quantity: string;
}

export interface IRecipe extends Document {
  name: string;
  category: string[];
  ingredients: Ingredient[];
  steps: string[];
  prepTime: string;
  imageUrl?: string;
}

const ingredientSchema = new Schema<Ingredient>({
  name: { type: String, required: true },
  quantity: { type: String, required: true }
});

const recipeSchema = new Schema<IRecipe>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: [String],
    required: true,
    enum: ['Meat' , 'Chicken' , 'Fish' , 'Dessert' , 'Snack' , 'Soup']
  },
  ingredients: [ingredientSchema],
  steps: {
    type: [String],
    required: true
  },
  prepTime: {
    type: String,
    required: true,
    match: /^[0-9]+ minutes$/ // Format: "30 minutes"
  },
  imageUrl: {
    type: String,
    match: /^https?:\/\/[^\s]+$/ // URL validation
  }
}, {
  timestamps: true // createdAt, updatedAt
});

// 👉 Indexes to improve search performance

recipeSchema.index({ category: 1 });
recipeSchema.index({ 'ingredients.name': 1 });


// 👉 Static Method (e.g., find by category)
recipeSchema.statics.findByCategory = function(category: string) {
  return this.find({ category });
};

// 👉 Model
const Recipe: Model<IRecipe> = mongoose.model<IRecipe>('Recipe', recipeSchema);

export default Recipe;
