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
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  checkRecipeOwnerShipMiddleware,
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
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateSearchQuery,
  getRecipesName(true)
);
router.get(
  "/search",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateSearchQuery,
  getRecipesName(false)
);
router.get(
  "/recipe/:recipeId",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  sanitizeRequestMiddleware,
  searchLimiter,
  validateIdParams,
  getRecipeById
);
router.post(
  "/recipes",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateRecipeIdBody,
  getSomeRecipesById
);
router.get(
  "/me/preview",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateSearchQuery,
  getPreviewRecipes(true)
);
router.get(
  "/preview",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateSearchQuery,
  getPreviewRecipes(false)
);
router.post(
  "/",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  searchLimiter,
  singleImageUpload,
  sanitizeRequestMiddleware,
  validateRecipe,
  createRecipe
);
router.put(
  "/:recipeId",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  checkRecipeOwnerShipMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  sanitizeRequestMiddleware,
  validateIdParams,
  validateRecipe,
  editRecipe
);
router.delete(
  "/:recipeId",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  checkRecipeOwnerShipMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams,
  deleteRecipe
);
router.put(
  "/image/:recipeId",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  checkRecipeOwnerShipMiddleware,
  searchLimiter,
  singleImageUpload,
  sanitizeRequestMiddleware,
  validateIdParams,
  editRecipeImage
);
router.get(
  "/category/:categoryId",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams,
  validateSearchQuery,
  getRecipesPreviewByCategory
);

export default router;
