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
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  checkIsGroupMemberShipMiddleware,
  checkIsGroupMemberAndOwnerRecipeMiddleware,
  checkIsGroupMemberAndOwnerRecipeOrAdminMiddleware,
  checkUserIsAdminOfGroupMiddleware,
} from "../middleware/authMiddleware";
import { searchLimiter } from "../middleware/rateLimiterMiddleware";
import { sanitizeRequestMiddleware } from "../middleware/sanitazeHtmlMiddleware";
import { validateIdParams } from "../middleware/validateMiddleware";
import { checkIfUserIsMemberOfGroup } from "../utils/checkUtils/checkUserUtils";
import { singleImageUpload } from "../middleware/uploadMiddleware";

const router = express.Router();

router.get(
  "/",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  searchLimiter,
  getUserGroups
);
router.get(
  "/:groupId",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  checkIsGroupMemberShipMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams,
  getGroupRecipesPreview
);
router.post(
  "/",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  createGroup
);
router.put(
  "/:groupId",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  checkUserIsAdminOfGroupMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams,
  editGroupDetails
);
router.delete(
  "/:groupId",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  checkUserIsAdminOfGroupMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams,
  deleteGroup
);
router.put(
  "/:groupId/recipe/:recipeId/add",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  checkIsGroupMemberAndOwnerRecipeMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams,
  addRecipeToGroup
);
router.put(
  "/:groupId/recipe/:recipeId/remove",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  checkIsGroupMemberAndOwnerRecipeOrAdminMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams,
  removeRecipeFromGroup
);
router.put(
  "/image/:groupId",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  checkUserIsAdminOfGroupMiddleware,
  searchLimiter,
  singleImageUpload,
  sanitizeRequestMiddleware,
  validateIdParams,
  updateImageOfGroup
);
router.put(
  "/:groupId/user/:userId/add",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  checkIsGroupMemberAndOwnerRecipeMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams
);

router.put(
  "/:groupId/user/:userId/remove",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  checkIsGroupMemberAndOwnerRecipeOrAdminMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams
);

export default router;
