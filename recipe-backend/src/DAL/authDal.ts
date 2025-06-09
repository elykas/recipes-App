import User from "../models/userModel";

export const mongoCreateUser = async (email: string, username: string) => {
  const user = await User.create({ email, username });
  return user;
};

export const mongoCheckUserExist = async (email: string) => {
  const user = await User.findOne({ email });
  return user ? user : null;
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
