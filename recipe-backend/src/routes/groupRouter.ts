import express from "express";
import {
  createGroup,
  deleteGroup,
  editGroupDetails,
  getGroupRecipesPreview,
  getUserGroups,
} from "../controllers/groupController";
import {
  authenticateToken,
  authorizeUserAndExist,
  checkGroupOwnerShip,
  checkUserIsAdminOfGroup,
} from "../middleware/authMiddleware";
import { searchLimiter } from "../middleware/rateLimiterMiddleware";
import { sanitizeRequestMiddleware } from "../middleware/sanitazeHtmlMiddleware";
import { validateIdParams } from "../middleware/validateMiddleware";

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  authorizeUserAndExist,
  searchLimiter,
  getUserGroups
);
router.get(
  "/:groupId",
  authenticateToken,
  authorizeUserAndExist,
  checkGroupOwnerShip,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams,
  getGroupRecipesPreview
);
router.post(
  "/",
  authenticateToken,
  authorizeUserAndExist,
  searchLimiter,
  sanitizeRequestMiddleware,
  createGroup
);
router.put(
  "/:groupId",
  authenticateToken,
  authorizeUserAndExist,
  checkUserIsAdminOfGroup,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams,
  editGroupDetails
);
router.delete(
  "/:groupId",
  authenticateToken,
  authorizeUserAndExist,
  checkUserIsAdminOfGroup,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams,
  deleteGroup
);
router.post("/:groupId/recipe/:recipeId", authenticateToken, authorizeUserAndExist, checkUserIsAdminOfGroup, searchLimiter, sanitizeRequestMiddleware, validateIdParams);

export default router;
