import { z } from "zod";

export const PostBodySchema = z.object({
  content: z.string().min(3).max(300).optional().nullable(),
  imageUrl: z.string().optional(),
  recipeId: z.uuid().optional().nullable(),
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
