import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email?: string;
  googleId?:string
  favoriteRecipes: mongoose.Types.ObjectId[];
  phone?: string
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
    match: /^\S+@\S+\.\S+$/
  },
  favoriteRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  ],
  googleId: {
    type:String,
    unique:true,
    sparse:true
  }
}, {
  timestamps: true 
});


userSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email }).populate('favoriteRecipes'); // Populates the recipe details
};

 
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
