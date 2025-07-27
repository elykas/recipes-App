import { z } from "zod";

export const PostBodySchema = z.object({
  content: z.string().min(3).max(300).optional(),
  imageUrl: z.string().optional(),
  recipeId: z.uuid().optional(),
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
