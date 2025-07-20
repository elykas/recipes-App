import {z} from "zod";

export const RecipeSchema = z.object({
    name: z.string().min(3).max(20),
    description: z.string(),
    prepTime: z.number(),
    ingredients: z.array(z.object({
        name: z.string(),
        quantity: z.string(),
        unit: z.string()
    })),
    steps: z.array(z.string()),
    category: z.array(z.object({
        name: z.string(),
        type: z.string()
    })),
    freeText: z.string()
})

export const searchQuerySchema = z.object({
  query: z.string().min(2, "Query too short").max(50, "Query too long"),
});

export const recipeIdParamsSchema = z.object({
  recipeId: z.uuid("Invalid recipe ID format"),
});