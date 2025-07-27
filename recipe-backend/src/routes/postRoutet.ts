import express from "express";
import { authenticateTokenMiddleware, authorizeUserAndExistMiddleware, checkIfUserOwnerOfPost } from "../middleware/authMiddleware";
import { create } from "domain";
import { singleImageUpload } from "../middleware/uploadMiddleware";
import { searchLimiter } from "../middleware/rateLimiterMiddleware";
import { createPost, deletePost, likePost, unlikePost, updatePost, updatePostImage } from "../controllers/postController";
import { sanitizeRequestMiddleware } from "../middleware/sanitazeHtmlMiddleware";
import { validateIdParams, validatePostBody } from "../middleware/validateMiddleware";

const router = express.Router();

router.post("/",
    authenticateTokenMiddleware,
    authorizeUserAndExistMiddleware,
    searchLimiter,
    singleImageUpload,
    sanitizeRequestMiddleware,
    validatePostBody,
    createPost
)
router.put("/:postId",
    authenticateTokenMiddleware,
    authorizeUserAndExistMiddleware,
    checkIfUserOwnerOfPost,
    searchLimiter,
    sanitizeRequestMiddleware,
    validateIdParams,
    validatePostBody,
    updatePost
)
router.put("/like/:postId",
    authenticateTokenMiddleware,
    authorizeUserAndExistMiddleware,
    likePost
)
router.put("/unlike/:postId",
    authenticateTokenMiddleware,
    authorizeUserAndExistMiddleware,
    unlikePost
)
router.put("img/:postId",
    authenticateTokenMiddleware,
    authorizeUserAndExistMiddleware,
    checkIfUserOwnerOfPost,
    searchLimiter,
    sanitizeRequestMiddleware,
    validateIdParams,
    updatePostImage
)
router.delete("/:postId",
    authenticateTokenMiddleware,
    authorizeUserAndExistMiddleware,
    checkIfUserOwnerOfPost,
    searchLimiter,
    sanitizeRequestMiddleware,
    validateIdParams,
    deletePost
)


export default router