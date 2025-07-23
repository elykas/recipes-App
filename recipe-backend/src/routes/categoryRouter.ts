import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController";
import {
  authenticateTokenMiddleware,
  authorizeAdminMiddleware,
  authorizeUserAndExistMiddleware,
} from "../middleware/authMiddleware";

const router = express.Router();

router.get(
  "/",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  getAllCategories
);
router.get(
  "/:categoryId",
  authenticateTokenMiddleware,
  authorizeAdminMiddleware,
  getCategoryById
);
router.post(
  "/",
  authenticateTokenMiddleware,
  authorizeAdminMiddleware,
  createCategory
);
router.put(
  "/:categoryId",
  authenticateTokenMiddleware,
  authorizeAdminMiddleware,
  updateCategory
);
router.delete(
  "/:categoryId",
  authenticateTokenMiddleware,
  authorizeAdminMiddleware,
  deleteCategory
);

export default router;
