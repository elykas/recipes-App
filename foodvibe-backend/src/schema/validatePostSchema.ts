import { z } from "zod";

export const PostBodySchema = z.object({
  content: z.string().min(3).max(300).optional().nullable().or(z.literal('')),
  recipeId: z.uuid().optional().nullable().or(z.literal('')),
});

export const LikeBodySchema = z.object({
  like: z.enum([
    "Yummy",
    "Hungry",
    "MustTry",
    "Foodgasm",
    "TastesLikesHome",
    "NotForMe",
    "TooSpicy",
    "Like",
  ]),
});
