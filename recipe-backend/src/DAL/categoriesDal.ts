import prisma from "../config/database";
import { Category } from "../models/recipeModel";

export const pgGetAllCategories = async (): Promise<Category[]> => {
    const categories: Category[] = await prisma.category.findMany();
    return categories;
};

export const pgGetCategoryById = async (id: number): Promise<Category | null> => {
    const category: Category | null = await prisma.category.findUnique({ where: { id } });
    return category;
};

export const pgCreateCategory = async (name: string): Promise<Category> => {
    const category: Category = await prisma.category.create({ data: { name } });
    return category;
};

export const pgUpdateCategory = async (id: number, name: string): Promise<Category> => {
    const category: Category = await prisma.category.update({ where: { id }, data: { name } });
    return category;
};

export const pgDeleteCategory = async (id: number): Promise<Category> => {
    const category: Category = await prisma.category.delete({ where: { id } });
    return category;
};
