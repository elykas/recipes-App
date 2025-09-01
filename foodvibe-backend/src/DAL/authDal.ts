import prisma from "../config/database";
import { UserWithoutRecipes } from "../types/response/userResponse";

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
    agreedToPolicyDate,
    agreedToPolicyVersion,
  } = userRegisterDetails;
  const user: UserWithoutRecipes = await prisma.user.create({
    data: {
      publicId,
      email,
      username,
      fullName,
      locale,
      birthDate: birthDate ? new Date(birthDate) : null,
      headLine,
      agreedToPolicy,
      agreedToPolicyDate : new Date(agreedToPolicyDate),
      agreedToPolicyVersion,
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

export const pgCheckUsernameExist = async (username: string): Promise<boolean> => {
  const usernameExist = await prisma.user.findUnique({
    where: { username },
  });
  return usernameExist ? true : false;
};