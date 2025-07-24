import { CategoryType } from "@prisma/client";
import {
  pgCreateCategory,
  pgDeleteCategory,
  pgGetAllCategories,
  pgGetCategoriesName,
  pgGetCategoryById,
  pgUpdateCategory,
} from "../DAL/categoriesDal";
import { ICategory } from "../models/recipeModel";
import { CategoriesResponse } from "../types/response/recipeResponses";
import errorResponse from "../utils/errors/errors";
import { CategoryDto } from "../dto/categoryDto";

export const getAllCategoriesService = async (): Promise<ICategory[]> => {
  const categories: ICategory[] = await pgGetAllCategories();
  return categories;
};

export const getCategoriesNameService = async (
  searchQuery: string
): Promise<CategoryDto[]> => {
  const categories: CategoriesResponse[] =
    await pgGetCategoriesName(searchQuery);
  const categoriesDto: CategoryDto[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    type: category.type,
  }));
  return categoriesDto;
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
