import { Category } from "../models/recipeModel";
import { pgGetAllCategories, pgGetCategoryById, pgCreateCategory, pgUpdateCategory, pgDeleteCategory } from "../DAL/categoriesDal";
import errorResponse from "../utils/errors/errors"
export const getAllCategoriesService = async (): Promise<Category[]> => {
    const categories: Category[] = await pgGetAllCategories();
    return categories;
};


export const getCategoryByIdService = async (id: number): Promise<Category> => {
    const category: Category | null = await pgGetCategoryById(id);
    if (!category) throw errorResponse("Category not found",404);
    return category;
};

export const createCategoryService = async (name: string): Promise<Category> => {
    const category: Category = await pgCreateCategory(name);
    return category;
};

export const updateCategoryService = async (id: number, name: string): Promise<Category> => {
    const category: Category = await pgUpdateCategory(id, name);
    return category;
};

export const deleteCategoryService = async (id: number): Promise<Category> => {
    const category: Category = await pgDeleteCategory(id);
    return category;
};