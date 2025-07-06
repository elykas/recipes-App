import prisma from "../config/database";

export const pgCreateUser = async (email: string, username: string) => {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        username,
      },
    });
    return user;
  } catch (error) {
    throw new Error("failed to create a user in the postgres database" + error);
  }
};

export const pgCheckUserExist = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user ? user : null;
  } catch (error) {
    throw new Error("failed to find a user in the postgres database" + error);
  }
};

export const pgFindOrCreateUserToGoogleAuth = async (
  googleId: string,
  username: string,
  email: string
) => {
  try {
    let user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        await prisma.user.update({
          where: { id: user.id },
          data: { googleId },
        });
      }
      return user;
    }

    user = await prisma.user.create({
      data: {
        googleId,
        username,
        email,
      },
    });

    return user;
  } catch (error) {
    throw new Error(
      "Failed to find or create a user in the Postgres database: " + error
    );
  }
};

