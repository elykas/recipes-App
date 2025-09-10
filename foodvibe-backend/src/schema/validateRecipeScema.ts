import { z } from "zod";

export const RecipeSchema = z.object({
  title: z.string().min(3).max(20),
  description: z.string().min(3).max(300).optional().nullable(),
  prepTime: z.number().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  difficulty: z.enum(["easy", "medium", "hard"]),
  isPublic: z.boolean(),
  tip: z.array(z.string()).optional().nullable(),
  ingredients: z.array(
    z.object({
      name: z.string().min(3).max(20),
      quantity: z.string().max(5).optional().nullable(),
      unit: z.string().max(20).optional().nullable(),
    })
  ),
  steps: z.array(
    z.object({
      title: z.string().min(3).max(20).optional().nullable(),
      description: z.string().min(3).max(300),
      duration: z.number().optional().nullable(),
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
    .optional().nullable(),
  cursor: z.string().optional().nullable(),
  pageSize: z
    .string()
    .optional()
    .nullable()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0 && val <= 100, {
      message: "Invalid page size",
    }),
});

export const IdParamsSchema = z.record(z.string(), z.uuid("Invalid ID format"));

export const IdsBodySchema = z.object({
  recipesId: z.array(z.uuid("Invalid IDs format")),
});
