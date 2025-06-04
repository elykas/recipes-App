import User from "../models/userModel";


export const mongoLoginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  return user;
};


export const mongoRegisterUser = async (
  email: string,
  password: string,
  username: string
) => {
  const existingUserByEmail = await User.findOne({ email });
  if (existingUserByEmail) {
    throw new Error("User already exists");
  }

  const registeredUser = await User.create({
    username,
    email,
    password,
  });
  return registeredUser;
};


export const mongoFindOrCreateUserToGoogleAuth = async (
  googleId: string,
  username: string,
  email: string
) => {
  let user = await User.findOne({ googleId });

  if (!user) {
    user = await User.create({
      googleId,
      username,
      email,
    });
  }
  return user;
};
