import { CategoryType } from "@prisma/client";
import prisma from "../config/database";
import { ICategory } from "../models/recipeModel";

export const pgGetAllCategories = async (): Promise<ICategory[]> => {
  const categories: ICategory[] = await prisma.category.findMany();
  return categories;
};

export const pgGetCategoryById = async (
  id: number
): Promise<ICategory | null> => {
  const category: ICategory | null = await prisma.category.findUnique({
    where: { id },
  });
  return category;
};

export const pgCreateCategory = async (name: string, type: CategoryType): Promise<ICategory> => {
  const category: ICategory = await prisma.category.create({
    data: { name, type },
  });
  return category;
};

export const pgUpdateCategory = async (
  id: number,
  name: string
): Promise<ICategory> => {
  const category: ICategory = await prisma.category.update({
    where: { id },
    data: { name },
  });
  return category;
};

export const pgDeleteCategory = async (id: number): Promise<ICategory> => {
  const category: ICategory = await prisma.category.delete({ where: { id } });
  return category;
};
