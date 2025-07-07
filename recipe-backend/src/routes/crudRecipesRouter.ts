import express from "express";
import {
  createRecipe,
  deleteRecipe,
  editRecipe,
  getAllRecipesFromUser,
  getByCategory,
  getRecipeById,
} from "../controllers/recipesController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authenticateToken, getAllRecipesFromUser);
router.get("/get-recipe/:recipeId", authenticateToken, getRecipeById);
router.post("/", authenticateToken, createRecipe);
router.put("/:recipeId", authenticateToken, editRecipe);
router.delete("/:recipeId", authenticateToken, deleteRecipe);
router.get("/get-by-category/:category", authenticateToken, getByCategory);

export default router;
