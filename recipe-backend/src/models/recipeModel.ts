import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import validator from 'validator';

interface Ingredient {
  name: string;
  quantity?: string;
  unit?:string
}

export interface IRecipe extends Document {
  name: string;
  category: string[];
  ingredients: Ingredient[];
  steps: string[];
  prepTime?: Number;
  imageUrl?: string;
  authorId: Types.ObjectId;
}

const ingredientSchema = new Schema<Ingredient>({
  name: { type: String, required: [true,"Ingredient name is required"], trim: true },
  quantity: { type: String },
  unit: { type: String }
});

const recipeSchema = new Schema<IRecipe>({
  name: {
    type: String,
    required: [true,"Recipe name is required"],
    unique: true,
    trim: true
  },
  category: {
    type: [String],
    required: [true,"Category is required"],
  },
  ingredients: [ingredientSchema],
  steps: {
    type: [String],
    required: [true,"Steps are required"]
  },
  prepTime: {
    type: Number,
    default: 30
  },
  imageUrl: {
    type: String,
    validate: {
          validator: function (value: string) {
            return validator.isURL(value);
          },
          message: "Please provide a valid  url",
        },
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true 
});


recipeSchema.index({ category: 1 });
recipeSchema.index({ 'ingredients.name': 1 });


// 👉 Static Method (e.g., find by category)
recipeSchema.statics.findByCategory = function(category: string) {
  return this.find({ category });
};

// 👉 Model
const Recipe: Model<IRecipe> = mongoose.model<IRecipe>('Recipe', recipeSchema);

export default Recipe;
