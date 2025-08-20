import express from "express";
import { authenticateTokenMiddleware, authorizeAdminMiddleware } from "../middleware/authMiddleware";
import { searchLimiter } from "../middleware/rateLimiterMiddleware";
import { sanitizeRequestMiddleware } from "../middleware/sanitazeHtmlMiddleware";
import { validateGetPolicyQuery, validatePolicyCreation } from "../middleware/validateMiddleware";
import { createPolicies } from "../controllers/policyController";
import e from "express";

const router = express.Router();

router.post(
  "/",
  authorizeAdminMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  validatePolicyCreation,
  createPolicies
);

router.get(
  "/",
  authenticateTokenMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateGetPolicyQuery,
  createPolicies
);

export default router;