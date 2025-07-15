import express from "express";
import {
  createRecipe,
  deleteRecipe,
  editRecipe,
  getAllRecipesOfUser,
  getRecipeById,
  getRecipesByCategory,
  getUserRecipesByCategory,
} from "../controllers/recipesController";
import { authenticateToken, authorizeAdmin, authorizeUserAndExist, checkRecipeOwnerShip } from "../middleware/authMiddleware";
import { validateRecipe } from "../middleware/validateMiddleware";
import {recipeMediaUpload} from "../middleware/uploadMiddleware";

const router = express.Router();

router.get("/", authenticateToken, authorizeUserAndExist, getAllRecipesOfUser);
router.get("/get-recipe/:recipeId", authenticateToken, authorizeUserAndExist, checkRecipeOwnerShip, getRecipeById);
router.post("/", authenticateToken, authorizeUserAndExist, validateRecipe, recipeMediaUpload, createRecipe);
router.put("/:recipeId", authenticateToken, authorizeUserAndExist, validateRecipe, checkRecipeOwnerShip, recipeMediaUpload, editRecipe);
router.delete("/:recipeId", authenticateToken, authorizeUserAndExist, checkRecipeOwnerShip, deleteRecipe);
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
