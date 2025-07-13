import {z} from "zod";

export const UserSchema = z.object({
    username: z.string().min(3).max(20).optional(),
    email: z.email().optional(),
    phone: z.string().regex(/^\+?\d{10,15}$/, "Invalid phone number").optional(),
    googleId: z.string().optional(),
    isAdmin: z.boolean(),
    imageUrl: z.string().optional(),
    bio: z.string().optional(),
})