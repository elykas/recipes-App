import { z } from "zod";

export const groupBodySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional().nullable(),
});
