import express from "express";
import {generateRecipe} from "../controllers/aiController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/generate-recipe",authenticateToken, generateRecipe);

export default router;