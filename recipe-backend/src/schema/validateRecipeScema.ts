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