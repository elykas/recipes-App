import express from "express";
import {
  updateUserImage,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  getAllUsernames,
  isUsernameAvailable,
  removeUserImage,
} from "../controllers/userController";
import {
  authenticateTokenMiddleware,
  authorizeAdminMiddleware,
  authorizeUserAndExistMiddleware,
} from "../middleware/authMiddleware";
import { validateUser, validateUserUpdate } from "../middleware/validateMiddleware";
import { singleImageUpload } from "../middleware/uploadMiddleware";
import { searchLimiter } from "../middleware/rateLimiterMiddleware";
import { sanitizeRequestMiddleware } from "../middleware/sanitazeHtmlMiddleware";

const router = express.Router();

router.get(
  "/get-user/",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  getUserById
);
router.get(
  "/",
  authenticateTokenMiddleware,
  authorizeAdminMiddleware,
  getAllUsers
);
router.put(
  "/",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  searchLimiter,
  sanitizeRequestMiddleware,
  validateUserUpdate,
  updateUser
);
router.post(
  "/img",
  singleImageUpload,
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  updateUserImage
);
router.delete(
  "/",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  searchLimiter,
  deleteUser
);
router.get(
  "/usernames",
  authenticateTokenMiddleware,
  searchLimiter,
  getAllUsernames
);
router.get(
  "/username-available/:username",
  authenticateTokenMiddleware,
  searchLimiter,
  isUsernameAvailable
);
router.put(
  "/remove-img",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  searchLimiter,
  removeUserImage
);

export default router;
