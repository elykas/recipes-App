import prisma from "../config/database";
import { UserWithoutRecipes } from "../types/response/recipeResponses";

export const pgCreateUser = async (
  publicId: string,
  userRegisterDetails: any
): Promise<UserWithoutRecipes> => {
  const {
    username,
    email,
    fullName,
    locale,
    birthDate,
    headLine,
    agreedToPolicy,
  } = userRegisterDetails;
  const user: UserWithoutRecipes = await prisma.user.create({
    data: {
      publicId,
      email,
      username,
      fullName,
      locale,
      birthDate,
      headLine,
      agreedToPolicy,
      agreedToPolicyDate: new Date(),
    },
  });
  return user;
};

export const pgCheckUserExist = async (
  publicId: string
): Promise<UserWithoutRecipes | null> => {
  const user: UserWithoutRecipes | null = await prisma.user.findUnique({
    where: { publicId },
  });
  return user ? user : null;
};
