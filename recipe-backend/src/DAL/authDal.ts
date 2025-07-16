import prisma from "../config/database";
import { UserWithoutRecipes } from "../types/responses";

export const pgCreateUser = async (
  publicId: string,
  userRegisterDetails: any
): Promise<UserWithoutRecipes> => {
  const {username, email, fullName, locale, birthdate, headline, agreedToPolicy
} = userRegisterDetails;
  const user: UserWithoutRecipes = await prisma.user.create({
    data: {
      publicId,
      email,
      username,
      fullName,
      locale,
      birthdate,
      headline,
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
