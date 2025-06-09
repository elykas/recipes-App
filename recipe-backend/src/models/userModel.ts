import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email?: string;
  googleId?:string
  favoriteRecipes: mongoose.Types.ObjectId[]; // Reference to Recipe IDs
}

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
  favoriteRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe' // Reference to Recipe model
    }
  ],
  googleId: {
    type:String,
    unique:true,
    sparse:true
  }
}, {
  timestamps: true // createdAt, updatedAt
});

userSchema.index({ email: 1 });

userSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email }).populate('favoriteRecipes'); // Populates the recipe details
};

 
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
