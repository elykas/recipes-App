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
  checkUserIsAdminOfGRoup,
} from "../middleware/authMiddleware";
import { searchLimiter } from "../middleware/rateLimiterMiddleware";
import { sanitizeRequestMiddleware } from "../middleware/sanitazeHtmlMiddleware";
import { validateIdParams } from "../middleware/validateMiddleware";
import de from "zod/v4/locales/de.cjs";

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
  checkUserIsAdminOfGRoup,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams,
  editGroupDetails
);
router.delete(
  "/:groupId",
  authenticateToken,
  authorizeUserAndExist,
  checkUserIsAdminOfGRoup,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams,
  deleteGroup
);

export default router;
