import mongoose, { Schema, Document, Model } from 'mongoose';

// 👉 User Interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  favoriteRecipes: mongoose.Types.ObjectId[]; // Reference to Recipe IDs
}

// 👉 User Schema
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/ // Basic email format validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  favoriteRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe' // Reference to Recipe model
    }
  ]
}, {
  timestamps: true // createdAt, updatedAt
});

// 👉 Index for quick lookup by email
userSchema.index({ email: 1 });

// 👉 Static Method (e.g., find by email)
userSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email }).populate('favoriteRecipes'); // Populates the recipe details
};

// 👉 Model
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
