import express from "express";
import {
  updateUserImage,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  getAllUsernames,
} from "../controllers/userController";
import {
  authenticateTokenMiddleware,
  authorizeAdminMiddleware,
  authorizeUserAndExistMiddleware,
} from "../middleware/authMiddleware";
import { validateUser } from "../middleware/validateMiddleware";
import { singleImageUpload } from "../middleware/uploadMiddleware";

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
  validateUser,
  updateUser
);
router.post(
  "/add-image",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  singleImageUpload,
  updateUserImage
);
router.delete(
  "/",
  authenticateTokenMiddleware,
  authorizeUserAndExistMiddleware,
  deleteUser
);
router.get(
  "usernames",
  authenticateTokenMiddleware,
  authorizeAdminMiddleware,
  getAllUsernames
)

export default router;
