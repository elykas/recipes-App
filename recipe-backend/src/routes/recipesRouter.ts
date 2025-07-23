import express from "express";
import {
  createRecipe,
  deleteRecipe,
  editRecipe,
  editRecipeImage,
  getPreviewRecipes,
  getRecipeById,
  getRecipesName,
  getRecipesPreviewByCategory,
  getSomeRecipesById,
} from "../controllers/recipesController";
import {
  authenticateToken,
  authorizeUserAndExist,
  checkRecipeOwnerShip,
} from "../middleware/authMiddleware";
import { searchLimiter } from "../middleware/rateLimiterMiddleware";
import { sanitizeRequestMiddleware } from "../middleware/sanitazeHtmlMiddleware";
import { singleImageUpload } from "../middleware/uploadMiddleware";
import {
  validateIdParams,
  validateRecipe,
  validateRecipeIdBody,
  validateSearchQuery,
} from "../middleware/validateMiddleware";

const router = express.Router();

router.get(
  "/my/search",
  authenticateToken,
  authorizeUserAndExist,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateSearchQuery,
  getRecipesName(true)
);
router.get(
  "/search",
  authenticateToken,
  authorizeUserAndExist,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateSearchQuery,
  getRecipesName(false)
);
router.get(
  "/recipe/:recipeId",
  authenticateToken,
  authorizeUserAndExist,
  sanitizeRequestMiddleware,
  searchLimiter,
  validateIdParams,
  getRecipeById
);
router.post(
  "/recipes",
  authenticateToken,
  authorizeUserAndExist,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateRecipeIdBody,
  getSomeRecipesById
);
router.get(
  "/me/preview",
  authenticateToken,
  authorizeUserAndExist,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateSearchQuery,
  getPreviewRecipes(true)
);
router.get(
  "/preview",
  authenticateToken,
  authorizeUserAndExist,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateSearchQuery,
  getPreviewRecipes(false)
);
router.post(
  "/",
  authenticateToken,
  authorizeUserAndExist,
  searchLimiter,
  singleImageUpload,
  sanitizeRequestMiddleware,
  validateRecipe,
  createRecipe
);
router.put(
  "/:recipeId",
  authenticateToken,
  authorizeUserAndExist,
  checkRecipeOwnerShip,
  searchLimiter,
  sanitizeRequestMiddleware,
  sanitizeRequestMiddleware,
  validateIdParams,
  validateRecipe,
  editRecipe
);
router.delete(
  "/:recipeId",
  authenticateToken,
  authorizeUserAndExist,
  checkRecipeOwnerShip,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams,
  deleteRecipe
);
router.put(
  "/image/:recipeId",
  authenticateToken,
  authorizeUserAndExist,
  checkRecipeOwnerShip,
  searchLimiter,
  singleImageUpload,
  sanitizeRequestMiddleware,
  validateIdParams,
  editRecipeImage
);
router.get(
  "/category/:categoryId",
  authenticateToken,
  authorizeUserAndExist,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams,
  validateSearchQuery,
  getRecipesPreviewByCategory
);

export default router;
