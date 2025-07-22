import express from "express";
import {
    createGroup,
  getGroupRecipesPreview,
  getUserGroups,
} from "../controllers/groupController";
import {
  authenticateToken,
  authorizeUserAndExist,
  checkGroupOwnerShip,
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
router.post("/",
  authenticateToken,
  authorizeUserAndExist,
  searchLimiter,
  sanitizeRequestMiddleware,
  createGroup
);
router.put("/:groupId");
router.delete("/:groupId");

export default router;
