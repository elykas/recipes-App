import express from "express";
import { generateRecipe } from "../controllers/aiController";
import {
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
} from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/generate-recipe",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  generateRecipe
);

export default router;
