import prisma from "../config/database";
import { UserIdentifier } from "../dto/userDto";
import { UserWithoutRecipes } from "../types/responses";

export const pgCreateUser = async (
  email: string,
  username: string
): Promise<UserWithoutRecipes> => {
  const user: UserWithoutRecipes = await prisma.user.create({
    data: {
      email,
      username,
    },
  });
  return user;
};

export const pgCheckUserExist = async (
  identifier: UserIdentifier
): Promise<UserWithoutRecipes | null> => {
  const user: UserWithoutRecipes | null = await prisma.user.findUnique({
    where: identifier,
  });
  return user ? user : null;
};

export const pgFindOrCreateUserToGoogleAuth = async (
  googleId: string,
  username: string,
  email: string
): Promise<UserWithoutRecipes> => {
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
};
