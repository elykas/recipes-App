import { z } from "zod";

export const RecipeSchema = z.object({
  title: z.string().min(3).max(20),
  description: z.string().min(3).max(300).optional(),
  prepTime: z.number().optional(),
  imageUrl: z.string().optional(),
  difficulty: z.enum(["easy", "medium", "hard"]),
  isPublic: z.boolean(),
  tip: z.array(z.string()).optional(),
  ingredients: z.array(
    z.object({
      name: z.string().min(3).max(20),
      quantity: z.string().max(5).optional(),
      unit: z.string().max(20).optional(),
    })
  ),
  steps: z.array(
    z.object({
      title: z.string().min(3).max(20).optional(),
      description: z.string().min(3).max(300),
      duration: z.number().optional(),
      order: z.number(),
    })
  ),
  categories: z.array(
    z.object({
      id: z.number(),
    })
  ),
});

export const searchQuerySchema = z.object({
  query: z
    .string()
    .min(2, "Query too short")
    .max(50, "Query too long")
    .optional(),
  cursor: z.string().optional(),
  pageSize: z
    .string()
    .optional()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0 && val <= 100, {
      message: "Invalid page size",
    }),
});

export const IdParamsSchema = z.record(z.string(), z.uuid("Invalid ID format"));

export const IdsBodySchema = z.object({
  recipesId: z.array(z.uuid("Invalid IDs format")),
});
