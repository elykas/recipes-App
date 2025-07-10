import {
  pgCreateCategory,
  pgDeleteCategory,
  pgGetAllCategories,
  pgGetCategoryById,
  pgUpdateCategory,
} from "../DAL/categoriesDal";
import { ICategory } from "../models/recipeModel";
import errorResponse from "../utils/errors/errors";
import { CategoryType } from "@prisma/client";

export const getAllCategoriesService = async (): Promise<ICategory[]> => {
  const categories: ICategory[] = await pgGetAllCategories();
  return categories;
};

export const getCategoryByIdService = async (
  id: number
): Promise<ICategory> => {
  const category: ICategory | null = await pgGetCategoryById(id);
  if (!category) throw errorResponse("Category not found", 404);
  return category;
};

export const createCategoryService = async (
  name: string,
  categoryType: CategoryType
): Promise<ICategory> => {
  const category: ICategory = await pgCreateCategory(name, categoryType);
  return category;
};

export const updateCategoryService = async (
  id: number,
  name: string
): Promise<ICategory> => {
  const category: ICategory = await pgUpdateCategory(id, name);
  return category;
};

export const deleteCategoryService = async (id: number): Promise<ICategory> => {
  const category: ICategory = await pgDeleteCategory(id);
  return category;
};
