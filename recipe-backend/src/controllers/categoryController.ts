import { NextFunction, Request, Response } from "express";
import { ICategory } from "../models/recipeModel";
import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
} from "../services/categoriesService";

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories: ICategory[] = await getAllCategoriesService();
    res
      .status(200)
      .json({
        data: categories,
        success: true,
        message: "Categories fetched successfully",
      });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const category: ICategory = await getCategoryByIdService(+categoryId);
    res
      .status(200)
      .json({
        data: category,
        success: true,
        message: "Category fetched successfully",
      });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {category, categoryType} = req.body;
    const newCategory: ICategory = await createCategoryService(category, categoryType);
    res
      .status(201)
      .json({
        data: newCategory,
        success: true,
        message: "Category created successfully",
      });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category: string = req.body;
    const { categoryId } = req.params;
    const updatedCategory: ICategory = await updateCategoryService(
      +categoryId,
      category
    );
    res
      .status(200)
      .json({
        data: updatedCategory,
        success: true,
        message: "Category updated successfully",
      });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory: ICategory = await deleteCategoryService(+categoryId);
    res
      .status(200)
      .json({
        data: deletedCategory,
        success: true,
        message: "Category deleted successfully",
      });
  } catch (error) {
    next(error);
  }
};
