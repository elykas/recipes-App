// import prisma from "../config/database";
// import { UserWithoutRecipes } from "../types/responses";

// export const pgCreateUser = async (
//   publicId: string,
//   userRegisterDetails: any
// ): Promise<UserWithoutRecipes> => {
//   const {username, email, fullName, locale, birthdate, headline, agreedToPolicy
// } = userRegisterDetails;
//   const user: UserWithoutRecipes = await prisma.user.create({
//     data: {
//       publicId,
//       email,
//       username,
//       fullName,
//       locale,
//       birthdate,
//       headline,
//       agreedToPolicy,  
//       agreedToPolicyDate: new Date(),
//     },
//   });
//   return user;
// };

// export const pgCheckUserExist = async (
//    publicId: string
// ): Promise<UserWithoutRecipes | null> => {
//   const user: UserWithoutRecipes | null = await prisma.user.findUnique({
//     where: { publicId },
//   });
//   return user ? user : null;
// };

// export const pgFindOrCreateUserToGoogleAuth = async (
//   googleId: string,
//   username: string,
//   email: string
// ): Promise<UserWithoutRecipes> => {
//   let user = await prisma.user.findUnique({
//     where: { email },
//   });
//   if (user) {
//     if (!user.googleId) {
//       user.googleId = googleId;
//       await prisma.user.update({
//         where: { id: user.id },
//         data: { googleId },
//       });
//     }
//     return user;
//   }

//   user = await prisma.user.create({
//     data: {
//       googleId,
//       username,
//       email,
//     },
//   });

//   return user;
// };
