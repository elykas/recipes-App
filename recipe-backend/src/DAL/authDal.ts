import User from "../models/userModel";

export const mongoCreateUser = async (email: string, username: string) => {
  try {
    const user = await User.create({ email, username });
    return user;
  } catch (error) {
    throw new Error("failed to create a user in the mongo database" + error);
  }
};

export const mongoCheckUserExist = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user ? user : null;
  } catch (error) {
    throw new Error("failed to find a user in the mongo database" + error);
  }
};

export const mongoFindOrCreateUserToGoogleAuth = async (
  googleId: string,
  username: string,
  email: string
) => {
  try {
    let user = await User.findOne({ email });
    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
      return user;
    }

    user = await User.create({
      googleId,
      username,
      email,
    });

    return user;
  } catch (error) {
    throw new Error("failed to find a user in the mongo database" + error);
  }
};
