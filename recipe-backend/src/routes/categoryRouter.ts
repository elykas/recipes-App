import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authenticateToken, getAllCategories);
router.get("/:categoryId", authenticateToken, getCategoryById);
router.post("/", authenticateToken, createCategory);
router.put("/:categoryId", authenticateToken, updateCategory);
router.delete("/:categoryId", authenticateToken, deleteCategory);

export default router;