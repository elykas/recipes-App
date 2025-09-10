import {z} from "zod";

export const UserSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.email(),
    phone: z.string().regex(/^\+?\d{10,15}$/, "Invalid phone number").optional(),
    googleId: z.string().optional(),
    isAdmin: z.boolean(),
    fullName: z.string().min(3).max(20).optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    bio: z.string().min(3).max(300).optional().nullable(),
    headLine: z.string().min(3).max(20).optional().nullable(),
    birthDate: z.date().optional().nullable(),
})

export const UserUpdateSchema = z.object({
    fullName: z.string().min(3).max(20).optional().nullable(),
    headLine: z.string().min(3).max(20).optional().nullable(),
    bio: z.string().min(3).max(300).optional().nullable(),
})