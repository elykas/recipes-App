import express from "express";
import {
  createRecipe,
  deleteRecipe,
  editRecipe,
  getAllRecipesName,
  getPreviewRecipes,
  getRecipeById,
  getRecipesByCategory,
  getUserRecipesByCategory,
} from "../controllers/recipesController";
import {
  authenticateToken,
  authorizeAdmin,
  authorizeUserAndExist,
  checkRecipeOwnerShip,
} from "../middleware/authMiddleware";
import {
  validateRecipe,
  validateRecipeIdParams,
  validateSearchQuery,
} from "../middleware/validateMiddleware";
import { singleImageUpload } from "../middleware/uploadMiddleware";
import { searchLimiter } from "../middleware/rateLimiterMiddleware";
import { sanitizeParamsMiddleware, sanitizeQueryMiddleware } from "../middleware/sanitazeHtmlMiddleware";

const router = express.Router();

router.get(
  "/my/search",
  authenticateToken,
  authorizeUserAndExist,
  searchLimiter,
  sanitizeQueryMiddleware,
  validateSearchQuery,
  getAllRecipesName(true)
);
router.get(
  "/search",
  authenticateToken,
  authorizeUserAndExist,
  searchLimiter,
  sanitizeQueryMiddleware,
  validateSearchQuery,
  getAllRecipesName(false)
);
router.get(
  "/recipe/:recipeId",
  authenticateToken,
  authorizeUserAndExist,
  sanitizeParamsMiddleware,
  searchLimiter,
  validateRecipeIdParams,
  getRecipeById
);
router.get(
  "/me/preview",
  authenticateToken,
  authorizeUserAndExist,
  searchLimiter,
  sanitizeQueryMiddleware,
  validateSearchQuery,
  getPreviewRecipes(true)
);
router.get(
  "/preview",
  authenticateToken,
  authorizeUserAndExist,
  searchLimiter,
  sanitizeQueryMiddleware,
  validateSearchQuery,
  getPreviewRecipes(false)
);
router.post(
  "/",
  authenticateToken,
  authorizeUserAndExist,
  validateRecipe,
  singleImageUpload,
  createRecipe
);
router.put(
  "/:recipeId",
  authenticateToken,
  authorizeUserAndExist,
  validateRecipe,
  checkRecipeOwnerShip,
  editRecipe
);
router.delete(
  "/:recipeId",
  authenticateToken,
  authorizeUserAndExist,
  checkRecipeOwnerShip,
  deleteRecipe
);
router.get(
  "/get-user-recipes-by-category/:categoryId",
  authenticateToken,
  authorizeUserAndExist,
  getUserRecipesByCategory
);
router.get(
  "/get-by-category/:categoryId",
  authenticateToken,
  authorizeAdmin,
  getRecipesByCategory
);

export default router;
