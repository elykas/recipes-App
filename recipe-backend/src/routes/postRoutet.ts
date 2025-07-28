import express from "express";
import {
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  checkIfUserOwnerOfPost,
} from "../middleware/authMiddleware";
import { create } from "domain";
import { singleImageUpload } from "../middleware/uploadMiddleware";
import { searchLimiter } from "../middleware/rateLimiterMiddleware";
import {
  createPost,
  deletePost,
  upsertLikeToPost,
  removeLikeFromPost,
  updatePost,
  updatePostImage,
  getSomePostsById,
} from "../controllers/postController";
import { sanitizeRequestMiddleware } from "../middleware/sanitazeHtmlMiddleware";
import {
  validateIdParams,
  validateLikeBody,
  validatePostBody,
  validatePostIdsBody,
} from "../middleware/validateMiddleware";

const router = express.Router();

router.get(
  "/",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  validatePostIdsBody,
  getSomePostsById
);
router.post(
  "/",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  searchLimiter,
  singleImageUpload,
  sanitizeRequestMiddleware,
  validatePostBody,
  createPost
);
router.put(
  "/:postId",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  checkIfUserOwnerOfPost,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams,
  validatePostBody,
  updatePost
);
router.post(
  "/like/:postId",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams,
  validateLikeBody,
  upsertLikeToPost
);
router.delete(
  "/unlike/:postId",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams,
  removeLikeFromPost
);
router.put(
  "img/:postId",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  checkIfUserOwnerOfPost,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams,
  updatePostImage
);
router.delete(
  "/:postId",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  checkIfUserOwnerOfPost,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateIdParams,
  deletePost
);

export default router;
