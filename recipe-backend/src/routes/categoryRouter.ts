import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController";
import { authenticateToken, authorizeAdmin, authorizeUserAndExist } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authenticateToken, authorizeUserAndExist, getAllCategories);
router.get("/:categoryId", authenticateToken, authorizeAdmin, getCategoryById);
router.post("/", authenticateToken, authorizeAdmin, createCategory);
router.put("/:categoryId", authenticateToken, authorizeAdmin, updateCategory);
router.delete("/:categoryId", authenticateToken, authorizeAdmin, deleteCategory);

export default router;