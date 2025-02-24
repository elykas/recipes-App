import express from 'express';
import { getAllRecipes, getRecipeById, createRecipe, editRecipe, deleteRecipe, getByCategory } from '../controllers/recipesController';

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/:recipeId', getRecipeById);
router.post('/', createRecipe);
router.put('/:recipeId', editRecipe);
router.delete('/:recipeId', deleteRecipe);
router.get('/:category', getByCategory);

export default router;