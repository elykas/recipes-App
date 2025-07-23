import express from "express";
import {
  addRecipeToGroup,
  createGroup,
  deleteGroup,
  editGroupDetails,
  getGroupRecipesPreview,
  getUserGroups,
  removeRecipeFromGroup,
  updateImageOfGroup,
} from "../controllers/groupController";
import {
  authenticateToken,
  authorizeUserAndExist,
  checkGroupOwnerShip,
  checkIsGroupMemberAndOwnerRecipe,
  checkIsGroupMemberAndOwnerRecipeOrAdmin,
  checkUserIsAdminOfGroup,
} from "../middleware/authMiddleware";
import { searchLimiter } from "../middleware/rateLimiterMiddleware";
import { sanitizeRequestMiddleware } from "../middleware/sanitazeHtmlMiddleware";
import { validateIdParams } from "../middleware/validateMiddleware";
import { checkIfUserIsMemberOfGroup } from "../utils/checkUtils/checkUserUtils";
import { singleImageUpload } from "../middleware/uploadMiddleware";

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
router.put(
  "/:groupId/recipe/:recipeId/add",
  authenticateToken,
  authorizeUserAndExist,
  checkIsGroupMemberAndOwnerRecipe,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams,
  addRecipeToGroup
);
router.put(
  "/:groupId/recipe/:recipeId/remove",
  authenticateToken,
  authorizeUserAndExist,
  checkIsGroupMemberAndOwnerRecipeOrAdmin,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams,
  removeRecipeFromGroup
);
router.put(
  "/image/:groupId",
  authenticateToken,
  authorizeUserAndExist,
  checkUserIsAdminOfGroup,
  searchLimiter,
  singleImageUpload,
  sanitizeRequestMiddleware,
  validateIdParams,
  updateImageOfGroup
);
router.put(
  "/:groupId/user/:userId/add",
  authenticateToken,
  authorizeUserAndExist,
  checkUserIsAdminOfGroup,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams
);

export default router;
