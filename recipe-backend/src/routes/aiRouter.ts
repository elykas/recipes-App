import express from "express";
import {generateRecipe} from "../controllers/aiController";
import { authenticateToken, authorizeUserAndExist } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/generate-recipe",authenticateToken, authorizeUserAndExist, generateRecipe);

export default router;